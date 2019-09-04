import React, { Component, Fragment } from 'react';
import Fade from 'react-reveal/Fade';

import TopJobWrap from './top-job-wrap';

import './top-jobs.css';

import {
    FaPencilRuler,
    FaPlusCircle,
    FaMoneyBillAlt,
    FaSuitcase,
    FaMapMarkerAlt
} from 'react-icons/fa';

import {
    Container,
    Row,
    Col,
    Button,
    Carousel,
    CarouselItem,
} from 'reactstrap';

const featuredJobs=[
    {
        "possition":"Restaurant Crew",
        "company":"Resto Bar",
        "location":"Florida",
        "salary":"$55000 - 70000",
        "category":"fulltime"
    },
    {
        "possition":"JavaScript Fullstack Developer",
        "company":"Cooper",
        "location":"Remote",
        "salary":"$55000 - 70000",
        "category":"freelance"
    },
    {
        "possition":"ReactJS Fullstack Developer",
        "company":"Cooper",
        "location":"Remote",
        "salary":"$55000 - 70000",
        "category":"freelance"
    },
    {
        "possition":"Asistant Broker, Real Estate",
        "company":"Realstate",
        "location":"New York",
        "salary":"$55000 - 70000",
        "category":"fulltime"
    },
    {
        "possition":"Telecommunication Manager",
        "company":"Think",
        "location":"London",
        "category":"partime"
    }
];

export default class TopJobs extends Component {

    
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === featuredJobs.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? featuredJobs.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    borderClass (category) {
        switch(category) {
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
        switch(category) {
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
        if(salary)
        return (<span> <FaMoneyBillAlt className="mr-1" /> {salary}</span>);
    }

    render() {
        const { activeIndex } = this.state;

        const slides = featuredJobs.map((item, index)=> {
            return(
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={`featured-job-${index}`}>
                    <div className="border rounded p-4 bg-white">
                        <h2 className="h5">{item.possition}</h2>
                        <p><span className={`border border-${this.borderClass(item.category)} rounded p-1 px-2 text-${this.borderClass(item.category)}`}>Freelance</span></p>
                        <p>
                        <span className="d-block"><FaSuitcase className="mr-1" /> {item.company}</span>
                        <span className="d-block"><FaMapMarkerAlt /> {item.location}</span>
                        <span className="d-block">{this.showSalary(item.salary)}</span>
                        </p>
                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi neque fugit tempora, numquam voluptate veritatis odit id, iste eum culpa alias, ut officiis omnis itaque ad, rem sunt doloremque molestias.</p>
                        <Button color="primary">Apply Now</Button>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <Container>
                <Row>
                    <Col md={8} className="mb-3 mb-5 mb-md-0">
                        <Fade top>
                            <h2 className="mb-5 h3">{this.props.title}</h2>
                            {
                                this.props.jobIds && this.props.jobIds.length >= 1 ?
                                this.props.jobIds.map((jobId, index) => {
                                    return (<TopJobWrap
                                        key={`job-wrap-${index}`}
                                        possition="Job Title"
                                        company="Cooper"
                                        location="Job Location"
                                        salary="$55000 - 70000"
                                        category="freelance"
                                        iconComponent={<FaPencilRuler className="icon mb-3 text-primary " />} />);
                                }) :
                                <div className="rounded border jobs-wrap"><h3>No results found</h3></div>
                            }
                            <Col md={12} className="text-center mt-5">
                                <Button ref="#" color="primary" className="rounded py-3 px-5"><FaPlusCircle /> Show More Jobs</Button>
                            </Col>
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