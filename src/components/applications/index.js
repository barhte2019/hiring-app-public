import React, { Component } from 'react';
import { withKeycloak } from 'keycloak-js';

export class ApplicationsListPage extends Component {
    render() {
        return <div>A LIST OF APPLICATIONS</div>
    }
}

export default withKeycloak(ApplicationsListPage)