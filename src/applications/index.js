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
            selectedJob: ''
        }

        this.toggle = this.toggle.bind(this);
        this.openProcessImage = this.openProcessImage.bind(this);
    }

    componentDidMount() {
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
                                            location: jobDetailResponse.data.hiringPetition.location
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

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    openProcessImage(selectedProcessId, selectedJob) {
        this.setState({ selectedProcessId, modal: true, selectedJob });
    }

    render() {
        const { applications, caseDetails, processInstances, caseStatus } = this.state;

        const loadingComponent = () => {
            return (<span>Loading ...</span>)
        }
        return (<div className='bg-light'>
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
                                        this.openProcessImage(
                                            processInstances[a['case-id']] && processInstances[a['case-id']].id ? processInstances[a['case-id']].id : 0,
                                            a['case-id']);
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
        </div >);
    }
}

export default withKeycloak(ApplicationsListPage);