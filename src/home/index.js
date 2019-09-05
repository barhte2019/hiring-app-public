import React, { Component, Fragment } from 'react';
import { withKeycloak } from 'react-keycloak';
import api from '../api'

import Cover from '../components/cover/cover';
import JobSearch from '../components/cover/job-search';
import DreamJobCover from '../components/cover/dream-job';

import SiteSection from '../components/site-section/site-section';
import PopularCategories from '../components/categories/popular';
import TopJobs from '../components/top-jobs/top-jobs';
import VideoSection from '../components/video-section/video-section';
import WhyChooseUs from '../components/why-choose-us';

export class HomePage extends Component {
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
        const showJobsSections =
            this.props.keycloak.authenticated ?
                <Fragment>
                    <SiteSection 
                        sectionComponent={<PopularCategories 
                            jobDetails={this.state.list} />} />
                    <SiteSection className="bg-light" 
                        sectionComponent={<TopJobs title="Search Results"
                            jobIds={this.state.jobIds} 
                            jobDetails={this.state.list} />} />
                </Fragment> : '';
        return (
            <Fragment>
                <Cover coverContent={<JobSearch />} />
                {showJobsSections}
                <SiteSection sectionComponent={<VideoSection />} />
                <Cover coverContent={<DreamJobCover />} />
                <SiteSection sectionComponent={<WhyChooseUs />} />
            </Fragment>)
    }
}

export default withKeycloak(HomePage);