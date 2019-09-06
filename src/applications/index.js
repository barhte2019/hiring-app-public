import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';

import { Button, Table } from 'reactstrap';

export class ApplicationsListPage extends Component {
    render() {
        return (<div className='bg-light'>
            <h3>Submitted job applications</h3>
            <Table>
                <thead>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Job Location</th>
                    <th>Job Reference</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    <tr>
                        <td>APP-0000001</td>
                        <td>A nice possition</td>
                        <td>At a nice location</td>
                        <td>JOB-0000001</td>
                        <td><Button color="link">Schedule Interviews</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>);
    }
}

export default withKeycloak(ApplicationsListPage);