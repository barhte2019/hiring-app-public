import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';
import api from '../api'

import SiteSection from '../components/site-section/site-section';
import TopJobs from '../components/top-jobs/top-jobs';

export class SearchResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobIds: [],
            milestones: {},
            list: {}
        }
    }

    componentDidMount() {
        api.jobs.list().then(jobListResponse => {
            if (jobListResponse.data.instances) {
                const jobIds = jobListResponse.data.instances.map(instance => instance['case-id']);

                jobIds.forEach(jobId => {
                    api.jobs.milestones(jobId).then(jobMilestoneResponse => {
                        if (jobMilestoneResponse.data.milestones.length === 1) {
                            const filteredJobIds = this.state.jobIds;
                            filteredJobIds.push(jobId);
                            this.setState(
                                { jobIds: filteredJobIds, }
                            )
                            api.jobs.detail(jobId).then(jobDetailResponse => {
                                this.setState({
                                    list: {
                                        ...this.state.list,
                                        [jobId]: jobDetailResponse.data.hiringPetition
                                    }
                                });
                            })
                        }
                    });
                });
            }
        });
    }

    render() {
        let renderable;
        if (this.props.keycloak.authenticated) {
            const jobsListing = (
                <TopJobs
                    title="Search Results"
                    jobIds={this.state.jobIds} 
                    jobDetails={this.state.list}
                    hideSearchAll={true} />);
            renderable = <SiteSection
                className="bg-light"
                sectionComponent={jobsListing} />
        } else {
            renderable = <SiteSection className='bg-light'>
                <h2 className="text-center" style={{ paddingTop: 80, paddingBottom: 80 }}>
                    Please login so you can search for jobs
                </h2></SiteSection>
        }

        return (renderable)
    }
}

export default withKeycloak(SearchResultsPage);