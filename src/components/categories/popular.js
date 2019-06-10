import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import { 
  FaHandHoldingUsd, 
  FaWrench, 
  FaHardHat, 
  FaBroadcastTower, 
  FaStethoscope,
  FaPencilRuler,
  FaTruckLoading,
  FaUtensils
} from 'react-icons/fa';


import {
  Container,
  Row,
  Col
} from 'reactstrap';

import './popular.css';

export default class PopularCategories extends Component {

  render() {
    return (
      <Container>
        <Row>
          <div className="col-md-6 mx-auto text-center mb-5 section-heading">
            <h2 className="mb-5">Popular Categories</h2>
          </div>
        </Row>
        <Row>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaHandHoldingUsd className="icon mb-3 text-primary " />

                <h2>Accounting / Finanace</h2>
                <span className="counting">10,391</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaWrench className="icon mb-3 text-primary " />

                <h2>Automotive Jobs</h2>
                <span className="counting">8,431</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaHardHat className="icon mb-3 text-primary " />

                <h2>Construction / Facilities</h2>
                <span className="counting">5,225</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaBroadcastTower className="icon mb-3 text-primary " />

                <h2>Telecomunications</h2>
                <span className="counting">15,211</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaStethoscope className="icon mb-3 text-primary " />

                <h2>Healthcare</h2>
                <span className="counting">18,419</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaPencilRuler className="icon mb-3 text-primary " />

                <h2>Design, Art &amp; Multimedia</h2>
                <span className="counting">4,554</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaTruckLoading className="icon mb-3 text-primary " />

                <h2>Transportation &amp; Logistics</h2>
                <span className="counting">4,211</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/" className="h-100 feature-item">
                <FaUtensils className="icon mb-3 text-primary " />

                <h2>Restaurant / Food Service</h2>
                <span className="counting">16,334</span>
              </a>
            </Fade>
          </Col>


        </Row>
      </Container>
    );
  }
}