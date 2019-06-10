import React, { Component } from 'react';

import './video-section.css';

import { 
    FaPlayCircle
  } from 'react-icons/fa';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

export default class VideoSection extends Component {
    render() {
        return (
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-5 mb-md-0">
                        <div className="img-border">
                            <a href="https://www.youtube.com/watch?v=IQ0Ru-uoDo0" className="popup-vimeo image-play" target="blank">
                            <span className="icon-wrap">
                                <FaPlayCircle />
                            </span>
                            <img src={require('../../images/hero_2.jpg')} alt="" className="img-fluid rounded" />
                            </a>
                        </div>
                    </Col>
                    <Col md={5} className="ml-auto">
                    <div className="text-left mb-5 section-heading">
                        <h2>Empowered by RHPAM</h2>
                        </div>

                        <p className="mb-4 h5 font-italic lineheight1-5">&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit nobis magni eaque velit eum, id rem eveniet dolor possimus voluptas..&rdquo;</p>
                        <p>&mdash; <strong className="text-black font-weight-bold">John Holmes</strong>, Marketing Strategist</p>
                        <p><a href="https://www.youtube.com/watch?v=IQ0Ru-uoDo0" className="popup-vimeo text-uppercase">Watch Video <span className="icon-arrow-right small"></span></a></p>
                    </Col>
                </Row>
            </Container>
        );
    }
}