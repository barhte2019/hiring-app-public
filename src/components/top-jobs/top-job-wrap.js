import React, { Component } from 'react';

import { 
    FaSuitcase,
    FaMapMarkerAlt,
    FaMoneyBillAlt
  } from 'react-icons/fa';

export default class TopJobWrap extends Component {

    borderClass (category) {
        switch(category) {
            case 'Full Time':
                return 'info';
            case 'Freelance':
                return 'warning';
            case 'Part Time':
                return 'danger';
            default:
                return 'success'
        }
    }

    showSalary(salary) {
        if(salary)
        return (<div> <FaMoneyBillAlt className="mr-1" /> {salary}</div>);
    }

    render() {
        return (
            <div className="rounded border jobs-wrap">
                <a href={`/apply/${this.props.jobId}`} className={`job-item d-block d-md-flex align-items-center  border-bottom ${this.props.category}`}>
                <div className="company-logo blank-logo text-center text-md-left pl-3">
                    {this.props.iconComponent}
                </div>
                <div className="job-details h-100">
                    <div className="p-3 align-self-center">
                        <h3>{this.props.possition}</h3>
                        <div className="d-block d-lg-flex">
                        <div className="mr-3"> <FaSuitcase className="mr-1" /> {this.props.company}</div>
                        <div className="mr-3"> <FaMapMarkerAlt className="mr-1" /> {this.props.location}</div>
                        {this.showSalary(this.props.salary)}
                        </div>
                    </div>
                </div>
                <div className="job-category align-self-center">
                <div className="p-3">
                    <span className={`text-info p-2 rounded border border-${this.borderClass(this.props.category)}`}>{this.props.category}</span>
                </div>
                </div>
                </a>
            </div>
        );
    }
}