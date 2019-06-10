import React, { Component } from 'react';

import {
    FaCompressArrowsAlt,
    FaArrowRight,
    FaClipboardList,
    FaCompass,
    FaCloud
} from 'react-icons/fa';

import {
    Container,
  } from 'reactstrap';

export default class WhyChooseUs extends Component {
    render() {
        return(<Container>
            <div className="text-center mb-5 section-heading">
                <h2>Why Red Hat PAM</h2>
            </div>

        <div className="d-block d-md-flex border-bottom">
          <div className="text-center p-4 item border-right" data-aos="fade">
            <FaCompressArrowsAlt className="display-3 mb-3 text-primary" />
            <h2 className="h4">Process Driven Applications</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>
            <p><a href="https://www.youtube.com/watch?v=oW4__q2iaJs" target="blank">View More <FaArrowRight className="small" /></a></p>
          </div>
          <div className="text-center p-4 item" data-aos="fade">
            <FaClipboardList className="display-3 mb-3 text-primary" />
            <h2 className="h4">Case Management</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>
            <p><a href="https://www.eweek.com/enterprise-apps/red-hat-adds-dynamic-case-management-features-to-bpm-suite" target="blank">View More <FaArrowRight className="small" /></a></p>
          </div>
        </div>
        <div className="d-block d-md-flex">
          <div className="text-center p-4 item border-right" data-aos="fade">
            <FaCompass className="display-3 mb-3 text-primary" />
            <h2 className="h4">Decision Management</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati reprehenderit explicabo quos fugit vitae dolorum.</p>
            <p><a href="https://www.youtube.com/watch?v=pEJbFyND5vM" target="blank">View More <FaArrowRight className="small" /></a></p>
          </div>
          <div className="text-center p-4 item" data-aos="fade">
          <FaCloud className="display-3 mb-3 text-primary" />
            <h2 className="h4">Cloud Ready</h2>
            <p>Cloud native app development sounds like another IT industry buzzword. But it might just be the breakthrough organizations are looking for to speed up innovation.</p>
            <p><a href="https://www.youtube.com/watch?v=7BERknbDWVc" target="blank">View More <FaArrowRight className="small" /></a></p>
          </div>
        </div>
        </Container>);
    }
}