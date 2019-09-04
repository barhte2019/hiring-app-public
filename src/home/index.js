import React, { Component, Fragment } from 'react';
import { withKeycloak } from 'react-keycloak';

import Cover from '../components/cover/cover';
import JobSearch from '../components/cover/job-search';
import DreamJobCover from '../components/cover/dream-job';

import SiteSection from '../components/site-section/site-section';
import PopularCategories from '../components/categories/popular';
import TopJobs from '../components/top-jobs/top-jobs';
import VideoSection from '../components/video-section/video-section';
import WhyChooseUs from '../components/why-choose-us';

export class HomePage extends Component {
    render() {
        const showJobsSections =
            this.props.keycloak.authenticated ?
                <Fragment>
                    <SiteSection sectionComponent={<PopularCategories />} />
                    <SiteSection className="bg-light" sectionComponent={<TopJobs />} />
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