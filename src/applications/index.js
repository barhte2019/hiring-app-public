import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';
import SVG from 'axios-react-inlinesvg';

import {
    Button,
    Modal, ModalHeader, ModalBody,
    Table
} from 'reactstrap';

import api from '../api'

export class ApplicationsListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            caseDetails: {},
            caseStatus: {},
            processInstances: {},
            modal: false,
            selectedProcessId: 0,
            selectedJob: '',
            acceptJobModal: false,
        }

        this.listJobs = this.listJobs.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openProcessImage = this.openProcessImage.bind(this);
        this.acceptJobOffer = this.acceptJobOffer.bind(this);

        this.toggleAcceptJob = this.toggleAcceptJob.bind(this);
    }

    listJobs() {
        api.applications.list().then(response => {
            if (response.data.instances) {
                this.setState({ applications: response.data.instances });
                response.data.instances.forEach(i => {
                    api.cases.caseFile(i['case-id']).then(caseDetailResponse => {
                        if (caseDetailResponse.data.jobApplication) {
                            this.setState({
                                caseDetails: {
                                    ...this.state.caseDetails,
                                    [i['case-id']]: {
                                        jobIdRef: caseDetailResponse.data.jobApplication.jobIdRef,
                                        jobTitle: caseDetailResponse.data.jobApplication.jobTitle
                                    }
                                }
                            });
                        }
                        api.cases.caseFile(caseDetailResponse.data.jobApplication.jobIdRef).then(jobDetailResponse => {
                            if (jobDetailResponse.data.hiringPetition && jobDetailResponse.data.hiringPetition.location) {
                                this.setState({
                                    caseDetails: {
                                        ...this.state.caseDetails,
                                        [i['case-id']]: {
                                            ...this.state.caseDetails[i['case-id']],
                                            location: jobDetailResponse.data.hiringPetition.location,
                                            salary: jobDetailResponse.data.hiringPetition.salaryMax,
                                            benefits: jobDetailResponse.data.offeredBenefits
                                        }
                                    }
                                })
                            }
                        })
                    });

                    api.process.byCorrelationKey(i['case-id']).then(piResponse => {
                        if (piResponse.data && piResponse.data['process-instance-id']) {
                            this.setState({
                                processInstances: {
                                    ...this.state.processInstances,
                                    [i['case-id']]: {
                                        id: piResponse.data['process-instance-id']
                                    }
                                }
                            })
                        }
                    })

                    api.cases.milestones(i['case-id']).then(milestoneResponse => {
                        if (milestoneResponse.data && milestoneResponse.data.milestones) {
                            let status = 'Submited';
                            switch (milestoneResponse.data.milestones.length) {
                                case 1:
                                    status = 'Interviewing';
                                    break;
                                case 2:
                                    status = 'Waiting for your response';
                                    break;
                                case 3:
                                    status = 'Application closed';
                                    break;
                                default: status = 'Submited';

                            }
                            this.setState({
                                caseStatus: {
                                    ...this.state.caseStatus,
                                    [i['case-id']]: {
                                        status
                                    }
                                }
                            })
                        }
                    })
                })
            }
        })
    }

    componentDidMount() {
        this.listJobs();
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    toggleAcceptJob() {
        this.setState(prevState => ({ acceptJobModal: !prevState.acceptJobModal }));
    }

    openProcessImage(selectedProcessId, selectedJob) {
        this.setState({ selectedProcessId, modal: true, selectedJob });
    }

    openAcceptJobModal(selectedProcessId, selectedJob) {
        this.setState({ selectedProcessId, acceptJobModal: true, selectedJob });
    }

    acceptJobOffer() {
        api.tasks.listMine()
            .then(response => {
                const selectedTask = response.data['task-summary'].find(p => p['task-proc-inst-id'] === this.state.selectedProcessId);
                if (selectedTask) {
                    const taskId = selectedTask['task-id'];
                    api.tasks.complete(taskId, { "jobOfferAccepted": true })
                        .then(r => {
                            this.listJobs();
                            this.toggleAcceptJob();
                        });
                }
            });
    }

    render() {
        const { keycloak } = this.props;
        const { applications, caseDetails, processInstances, caseStatus } = this.state;

        const loadingComponent = () => {
            return (<span>Loading ...</span>)
        }
        return keycloak.authenticated ? (<div className='bg-light'>
            <h3>Submitted job applications</h3>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Job Title</th>
                        <th>Job Location</th>
                        <th>Job Reference</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((a, index) => (
                        <tr key={`app-row-${index}`}>
                            <td>{a['case-id']}</td>
                            <td>{caseDetails[a['case-id']] && caseDetails[a['case-id']].jobTitle ? caseDetails[a['case-id']].jobTitle : 'loading'}</td>
                            <td>{caseDetails[a['case-id']] && caseDetails[a['case-id']].location ? caseDetails[a['case-id']].location : 'loading'}</td>
                            <td>{caseDetails[a['case-id']] && caseDetails[a['case-id']].jobIdRef ? caseDetails[a['case-id']].jobIdRef : 'loading'}</td>
                            <td>
                                <Button
                                    color="link"
                                    onClick={() => {
                                        const status = caseStatus[a['case-id']] && caseStatus[a['case-id']].status ? caseStatus[a['case-id']].status : 'loading';
                                        if (status === 'Waiting for your response') {
                                            this.openAcceptJobModal(processInstances[a['case-id']] && processInstances[a['case-id']].id ? processInstances[a['case-id']].id : 0,
                                                a['case-id']);
                                        } else {
                                            this.openProcessImage(
                                                processInstances[a['case-id']] && processInstances[a['case-id']].id ? processInstances[a['case-id']].id : 0,
                                                a['case-id']);
                                        }
                                    }}>
                                    {caseStatus[a['case-id']] && caseStatus[a['case-id']].status ? caseStatus[a['case-id']].status : 'loading'}
                                </Button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg'>
                <ModalHeader toggle={this.toggle}>Job Application status ({this.state.selectedJob})</ModalHeader>
                <ModalBody style={{ textAlign: "center" }}>
                    <SVG
                        src='/404.svg'
                        cacheRequests={false}
                        loader={loadingComponent}
                        axiosRequest={api.process.image(this.state.selectedProcessId)}
                        onError={loadingComponent} />
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.acceptJobModal} size='md'>
                <ModalHeader toggle={this.toggleAcceptJob}>Job Offer details</ModalHeader>
                <ModalBody>
                    <p><b>Application: </b>{this.state.selectedJob}</p>
                    <p>Please accept the following job offer and we will wait for you in the office:</p>
                    <p><b>Salary: </b>$ {caseDetails[this.state.selectedJob] && caseDetails[this.state.selectedJob].salary ? caseDetails[this.state.selectedJob].salary : 'loading'}</p>
                    <p><b>Benefits: </b></p><ul>
                        {caseDetails[this.state.selectedJob] && caseDetails[this.state.selectedJob].benefits && caseDetails[this.state.selectedJob].benefits.map((b, index) => {
                            return (<li key={`benefit-${index}`}><b>{b.benefitName}</b>: {b.benefitDescription}</li>)
                        })}
                    </ul>
                    <Button color='success' onClick={this.acceptJobOffer}>Accept</Button>
                </ModalBody>
            </Modal>
        </div >)
            :
            <div className='site-sectin bg-light'>
                <h2 className="text-center" style={{ paddingTop: 80, paddingBottom: 80 }}>
                    Please login so you can apply for jobs
            </h2>
            </div>;
    }
}

export default withKeycloak(ApplicationsListPage);