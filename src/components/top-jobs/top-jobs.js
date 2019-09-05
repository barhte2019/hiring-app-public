import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { navigate } from "@reach/router"

import TopJobWrap from './top-job-wrap';

import './top-jobs.css';

import {
    FaPencilRuler,
    FaPlusCircle,
    FaMoneyBillAlt,
    FaSuitcase,
    FaMapMarkerAlt,
    FaHandHoldingUsd,
    FaHardHat,
    FaBroadcastTower,
    FaStethoscope,
    FaTruckLoading,
    FaUserFriends,
    FaCogs,
    FaFileExcel,
    FaFileSignature,
} from 'react-icons/fa';

import {
    Container,
    Row,
    Col,
    Button,
    Carousel,
    CarouselItem,
} from 'reactstrap';

export default class TopJobs extends Component {


    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.onSearchAll = this.onSearchAll.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onSearchAll() {
        navigate('/search');
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.jobIds.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.jobIds.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
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

    categoryDisplayName(category) {
        switch (category) {
            case 'fulltime':
                return 'Full Time';
            case 'freelance':
                return 'Freelance';
            case 'partime':
                return 'Par Time';
            default:
                return 'A Job'
        }
    }

    showSalary(salary) {
        if (salary)
            return (<span> <FaMoneyBillAlt className="mr-1" /> {salary}</span>);
    }

    render() {
        const { activeIndex } = this.state;
        const {jobIds, jobDetails, hideSearchAll} = this.props;

        const minMaxSalary = (jobId) => {
            const min = jobDetails[jobId] ? jobDetails[jobId].salaryMin : 0;
            const max = jobDetails[jobId] ? jobDetails[jobId].salaryMax : 0;

            return '$' + min.toLocaleString() + ' - ' + max.toLocaleString();
        }

        const slides = jobIds && jobIds.length >= 1 ?
            jobIds.map((jobId, index) => (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={`featured-job-${index}`}>
                    <div className="border rounded p-4 bg-white">
                        <h2 className="h5">{jobDetails[jobId] ? jobDetails[jobId].jobTitle : 'loading'}</h2>
                        <p><span className={`border border-${this.borderClass(jobDetails[jobId] ? jobDetails[jobId].jobType : 'loading')} rounded p-1 px-2 text-${this.borderClass(jobDetails[jobId] ? jobDetails[jobId].jobType : 'loading')}`}>{jobDetails[jobId] ? jobDetails[jobId].jobType : 'loading'}</span></p>
                        <p>
                            <span className="d-block"><FaSuitcase className="mr-1" /> {jobDetails[jobId] ? jobDetails[jobId].jobCategory : 'loading'}</span>
                            <span className="d-block"><FaMapMarkerAlt /> {jobDetails[jobId] ? jobDetails[jobId].location : 'loading'}</span>
                            <span className="d-block">{this.showSalary(minMaxSalary(jobId))}</span>
                        </p>
                        <p className="mb-0">{jobDetails[jobId] ? jobDetails[jobId].jobDescription : 'loading'}</p>
                        <Button color="primary">Apply Now</Button>
                    </div>
                </CarouselItem>
            )) : [<CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={`featured-job-empty`}>
                <div className="border rounded p-4 bg-white">
                    <h2 className="h5">No Jobs Available</h2>
                    <p className="mb-0">Come back later and find interesting open positions in our company.</p>
                </div>
            </CarouselItem>];

        const iconComponent = (jobCategory) => {
            switch (jobCategory) {
                case "Accounting / Finance":
                    return <FaHandHoldingUsd className="icon mb-3 text-primary " />
                case "Construction / Facilities":
                    return <FaHardHat className="icon mb-3 text-primary " />
                case "Desig, Art & Multimedia":
                    return <FaPencilRuler className="icon mb-3 text-primary " />
                case "Healthcare":
                    return <FaStethoscope className="icon mb-3 text-primary " />
                case "Human Resources":
                    return <FaUserFriends className="icon mb-3 text-primary " />
                case "Operations":
                    return <FaCogs className="icon mb-3 text-primary " />
                case "Project Manager":
                    return <FaFileExcel className="icon mb-3 text-primary " />
                case "Team Manager":
                    return <FaFileSignature className="icon mb-3 text-primary " />
                case "Telecomunications":
                    return <FaBroadcastTower className="icon mb-3 text-primary " />
                case "Transportation & Logistics":
                    return <FaTruckLoading className="icon mb-3 text-primary " />
                default: return <FaCogs className="icon mb-3 text-primary " />
            }
        }

        const searchAllButton = hideSearchAll ? '' :
            <Col md={12} className="text-center mt-5">
                <Button
                    color="primary"
                    className="rounded py-3 px-5"
                    onClick={this.onSearchAll}><FaPlusCircle /> Show More Jobs</Button>
            </Col>;

        return (
            <Container>
                <Row>
                    <Col md={8} className="mb-3 mb-5 mb-md-0">
                        <Fade top>
                            <h2 className="mb-5 h3">{this.props.title}</h2>
                            {
                                jobIds && jobIds.length >= 1 ?
                                    jobIds.map((jobId, index) => {
                                        return (<TopJobWrap
                                            key={`job-wrap-${index}`}
                                            possition={jobDetails[jobId] ? jobDetails[jobId].jobTitle : 'loading'}
                                            company={jobDetails[jobId] ? jobDetails[jobId].jobCategory : 'loading'}
                                            location={jobDetails[jobId] ? jobDetails[jobId].location : 'loading'}
                                            salary={minMaxSalary(jobId)}
                                            category={jobDetails[jobId] ? jobDetails[jobId].jobType : 'loading'}
                                            iconComponent={iconComponent(jobDetails[jobId] ? jobDetails[jobId].jobCategory : 'loading')} />);
                                    }) :
                                    <div className="rounded border jobs-wrap"><h3>No results found</h3></div>
                            }
                            {searchAllButton}
                        </Fade>
                    </Col>
                    <Col md={4} className="block-16">
                        <Fade duration={1500} top>
                            <div className="d-flex mb-0">
                                <h2 className="mb-5 h3 mb-0">Featured Jobs</h2>
                                <div className="ml-auto mt-1">
                                    <Button color="link" onClick={this.previous}>Prev</Button> / <Button color="link" onClick={this.next}>Next</Button>
                                </div>
                            </div>
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}>
                                {slides}
                            </Carousel>
                        </Fade>
                    </Col>
                </Row>
            </Container>
        );
    }
}