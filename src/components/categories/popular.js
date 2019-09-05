import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import {
  FaHandHoldingUsd,
  FaCogs,
  FaHardHat,
  FaBroadcastTower,
  FaStethoscope,
  FaPencilRuler,
  FaTruckLoading,
  FaUserFriends,
  FaFileExcel,
  FaFileSignature
} from 'react-icons/fa';


import {
  Container,
  Row,
  Col
} from 'reactstrap';

import './popular.css';

export default class PopularCategories extends Component {

  render() {
    const { jobDetails } = this.props;

    const countByCategory = (categoryName) => {
      let counter = 0;
      Object.keys(jobDetails).forEach(k => { if (jobDetails[k].jobCategory === categoryName) { counter++; } })
      return counter;
    }

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
              <a href="/search" className="h-100 feature-item">
                <FaHandHoldingUsd className="icon mb-3 text-primary " />

                <h2>Accounting / Finanace</h2>
                <span className="counting">{countByCategory("Accounting / Finance")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaHardHat className="icon mb-3 text-primary " />

                <h2>Construction / Facilities</h2>
                <span className="counting">{countByCategory("Construction / Facilities")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaPencilRuler className="icon mb-3 text-primary " />

                <h2>Design, Art &amp; Multimedia</h2>
                <span className="counting">{countByCategory("Desig, Art & Multimedia")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaStethoscope className="icon mb-3 text-primary " />

                <h2>Healthcare</h2>
                <span className="counting">{countByCategory("Healthcare")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaUserFriends className="icon mb-3 text-primary " />

                <h2>Human Resources</h2>
                <span className="counting">{countByCategory("Human Resources")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaCogs className="icon mb-3 text-primary " />

                <h2>Operations</h2>
                <span className="counting">{countByCategory("Operations")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaFileExcel className="icon mb-3 text-primary " />

                <h2>Project Manager</h2>
                <span className="counting">{countByCategory("Project Manager")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaFileSignature className="icon mb-3 text-primary " />

                <h2>Team Manager</h2>
                <span className="counting">{countByCategory("Team Manager")}</span>
              </a>
            </Fade>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaBroadcastTower className="icon mb-3 text-primary " />

                <h2>Telecomunications</h2>
                <span className="counting">{countByCategory("Telecomunications")}</span>
              </a>
            </Fade>
          </Col>


          <Col sm={6} md={4} lg={3} className="mb-3">
            <Fade top>
              <a href="/search" className="h-100 feature-item">
                <FaTruckLoading className="icon mb-3 text-primary " />

                <h2>Transportation &amp; Logistics</h2>
                <span className="counting">{countByCategory("Transportation & Logistics")}</span>
              </a>
            </Fade>
          </Col>


        </Row>
      </Container>
    );
  }
}