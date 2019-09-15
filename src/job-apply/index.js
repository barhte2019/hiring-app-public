import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak'
import api from '../api'
import { navigate } from "@reach/router"

import {
    FaSuitcase,
    FaMapMarkerAlt,
    FaMoneyBillAlt,
} from 'react-icons/fa';
import {
    Button,
    Form,
    Input,
    Spinner,
    Table,
} from 'reactstrap';

export class JobApplyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caseDetail: {},
            jobDetails: {},
            requestedSkills: [],
            reportedSkills: {},
            interviewerAssignments: [],
            loading: false,
        }

        this.handleYearsOfExperienceChange = this.handleYearsOfExperienceChange.bind(this);
        this.handleLevelOfKnowledgeChange = this.handleLevelOfKnowledgeChange.bind(this);
        this.jobApplyFormSubmit = this.jobApplyFormSubmit.bind(this);
    }

    borderClass(category) {
        switch (category) {
            case 'fulltime':
                return 'info';
            case 'freelance':
                return 'warning';
            case 'partime':
                return 'danger';
            default:
                return 'success'
        }
    }

    showSalary(salary) {
        if (salary)
            return (<span> <FaMoneyBillAlt className="mr-1" /> {salary}</span>);
    }

    componentDidMount() {
        const { jobId } = this.props;
        api.cases.caseFile(jobId).then(response => {
            this.setState({
                interviewerAssignments: response.data.interviewerAssignments.map(item => {
                    if (item['com.myspace.hr_hiring.InterviewerAssignment']) {
                        return { ...item['com.myspace.hr_hiring.InterviewerAssignment'] }
                    } else {
                        return { ...item }
                    }
                }),
                jobDetails: response.data.hiringPetition,
                requestedSkills: response.data.requestedSkills.map(item => {
                    if (item['com.myspace.hr_hiring.CandidateSkill']) {
                        return { ...item['com.myspace.hr_hiring.CandidateSkill'] }
                    } else {
                        return { ...item }
                    }
                })
            });
            api.cases.caseDetail(jobId).then(caseResponse => {
                this.setState({
                    caseDetail: caseResponse.data
                })
            })
        });
    }

    handleYearsOfExperienceChange(event) {
        this.setState({ 'reportedSkills': { ...this.state.reportedSkills, [event.target.name]: { ...this.state.reportedSkills[event.target.name], 'yearsOfExperience': event.target.value } } })
    }

    handleLevelOfKnowledgeChange(event) {
        const lk = event.target.value === 'Select one' ? '' : event.target.value;
        this.setState({ 'reportedSkills': { ...this.state.reportedSkills, [event.target.name]: { ...this.state.reportedSkills[event.target.name], 'levelOfKnowledge': lk } } })
    }

    jobApplyFormSubmit(event) {
        const { keycloak, jobId } = this.props;
        const { caseDetail, jobDetails, reportedSkills, interviewerAssignments } = this.state;

        event.preventDefault();
        this.setState({ ...this.state, loading: true });
        const applicant = keycloak.tokenParsed ? keycloak.tokenParsed['preferred_username'] : keycloak.subject;
        const caseData = {
            'internal': true,
            'interviewerAppointments': interviewerAssignments
                .map(i => {
                    return { 'com.myspace.hr_hiring.InterviewAppointment': {
                        comment: i.comment,
                        interviewDurationMinutes: 0,
                        interviewee: applicant,
                        interviewer: i.interviewerName
                    }}
                }),
            'jobApplication': {
                'internal': true,
                'applicantName': applicant,
                'skills': Object.keys(reportedSkills).map(k => { return { 'skillName': k, 'levelOfKnowledge': reportedSkills[k].levelOfKnowledge, 'yearsOfExperience': reportedSkills[k].yearsOfExperience } }),
                'jobIdRef': jobId,
                'jobTitle': jobDetails.jobTitle
            },
        }
        api.jobs.apply(caseData, caseDetail['case-owner'], applicant).then(response => {
            this.setState({ ...this.state, loading: false })
            navigate('/applications');
        }).catch(err => {
            console.log(err);
            this.setState({ ...this.state, loading: false })
        })
    }

    render() {
        const { keycloak, jobId } = this.props;
        const { jobDetails, requestedSkills, loading } = this.state;

        const minMaxSalary = () => {
            const min = jobDetails && jobDetails.salaryMin ? jobDetails.salaryMin.toLocaleString() : 0;
            const max = jobDetails && jobDetails.salaryMax ? jobDetails.salaryMax.toLocaleString() : 0;

            return '$' + min + ' - ' + max;
        }

        const skillsMatrix = requestedSkills.map((skill, index) => {
            return (
                <tr key={`fg-skill-${index}`}>
                    <td>{index + 1}</td>
                    <td>{skill.skillName}</td>
                    <td><Input required max={15} maxLength={2} onChange={this.handleYearsOfExperienceChange} name={skill.skillName} type="number" /></td>
                    <td><Input onChange={this.handleLevelOfKnowledgeChange} type="select" name={skill.skillName} id="exampleSelect">
                        <option>Select one</option>
                        <option>Basic</option>
                        <option>Proficient</option>
                        <option>Expert</option>
                    </Input>
                    </td>
                </tr>)
        })

        return keycloak.authenticated ?
            <div className='bg-light'>
                <h3 className="text-center">You are applying for job id: {jobId}</h3>
                <div className="border rounded p-4 bg-white">
                    <h2 className="h5">{jobDetails ? jobDetails.jobTitle : 'loading'}</h2>
                    <p><span className={`border border-${this.borderClass(jobDetails ? jobDetails.jobType : 'loading')} rounded p-1 px-2 text-${this.borderClass(jobDetails ? jobDetails.jobType : 'loading')}`}>{jobDetails ? jobDetails.jobType : 'loading'}</span></p>
                    <p>
                        <span className="d-block"><FaSuitcase className="mr-1" /> {jobDetails ? jobDetails.jobCategory : 'loading'}</span>
                        <span className="d-block"><FaMapMarkerAlt /> {jobDetails ? jobDetails.location : 'loading'}</span>
                        <span className="d-block">{this.showSalary(minMaxSalary(jobId))}</span>
                    </p>
                    <p className="mb-0">{jobDetails ? jobDetails.jobDescription : 'loading'}</p>
                </div>
                <h3 className="text-center">Please fill the following skill matrix based in your habilities</h3>
                <Form action="#" className="p-5 bg-white" onSubmit={this.jobApplyFormSubmit}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Skill</th>
                                <th>Years of Experience</th>
                                <th>Level of knowledge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skillsMatrix}
                        </tbody>
                    </Table>
                    <Button type="submit" color="success" disabled={loading}>
                        {loading && <Spinner type="grow" color="primary" />}
                        {loading && <span style={{ marginLeft: 5, marginBottom: 5 }}>Submitting Application</span>}
                        {!loading && <span>Submit Application</span>}
                    </Button>
                </Form>
            </div>
            :
            <div className='site-sectin bg-light'>
                <h2 className="text-center" style={{ paddingTop: 80, paddingBottom: 80 }}>
                    Please login so you can apply for jobs
                </h2>
            </div>;
    }
}

export default withKeycloak(JobApplyPage);
