import React, {Component} from 'react';


import {
    Row,
    Col,
    Input,
    Button
  } from 'reactstrap';

export default class JobSearch extends Component {
    render() {
        return(
        <Col>
            <h1>Find Job</h1>
            <form action="#">
                <Row className="mb-3">
                    <Col className="mb-9">
                        <Row>
                        <Col className="col-md-6 mb-3 mb-md-0">
                            <Input className="mr-3 border-0 px-4" placeholder="job title" />
                        </Col>
                        <Col className="col-md-6 mb-3 mb-md-0">
                            <Input className="mr-3 border-0 px-4" placeholder="city, province or region" />
                        </Col>
                        </Row>
                    </Col>
                    <Col className="mb-3">
                        <Button color="success">Search</Button>
                    </Col>
                </Row>
            </form>
        </Col>
        );
    }
}