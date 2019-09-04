import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';
import { navigate } from "@reach/router"

import {
    Row,
    Col,
    Input,
    Button
} from 'reactstrap';

export class JobSearch extends Component {

    constructor(props) {
        super(props);

        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangeJobLocation = this.onChangeJobLocation.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);

        this.state = {
            jobTitle: '',
            jobLocation: ''
        }
    }

    onChangeJobTitle(event) {
        this.setState({
            jobTitle: event.target.value,
        });
    }

    onChangeJobLocation(event) {
        this.setState({
            jobLocation: event.target.value,
        })
    }

    onSearchClick() {
        if (this.props.keycloak.authenticated) {
            navigate(`/search/?title=${this.state.jobTitle}&location=${this.state.jobLocation}`)
        } else {
            this.props.keycloak.login();
        }
    }

    render() {
        return (
            <Col>
                <h1>Find Job</h1>
                <form action="#">
                    <Row className="mb-3">
                        <Col className="mb-9">
                            <Row>
                                <Col className="col-md-6 mb-3 mb-md-0">
                                    <Input
                                        className="mr-3 border-0 px-4"
                                        placeholder="job title"
                                        onChange={this.onChangeJobTitle}
                                        value={this.state.jobTitle} />
                                </Col>
                                <Col className="col-md-6 mb-3 mb-md-0">
                                    <Input
                                        className="mr-3 border-0 px-4"
                                        placeholder="city, province or region"
                                        onChange={this.onChangeJobLocation}
                                        value={this.state.jobLocation} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mb-3">
                            <Button
                                color="success"
                                onClick={this.onSearchClick}>Search</Button>
                        </Col>
                    </Row>
                </form>
            </Col>
        );
    }
}

export default withKeycloak(JobSearch);
