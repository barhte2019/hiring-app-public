import React, { Component } from 'react';
import { withKeycloak } from 'react-keycloak';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

import './Menu.css';

export class Menu extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const appsNavItem =
      this.props.keycloak.authenticated ?
        <NavItem>
          <NavLink href="/applications">My Applications</NavLink>
        </NavItem> : '';

    console.log(this.props.keycloak.keycloakInitialized);
    console.log(this.props.keycloak.authenticated);
    const loginNavItem =
      this.props.keycloak.authenticated ?
        <NavItem>
          <Button color="danger" onClick={() => { this.props.keycloak.logout() }}>Log out</Button>
        </NavItem> :
        <NavItem>
          <Button color="success" onClick={() => { this.props.keycloak.login() }}>Login</Button>
        </NavItem>

    return (
      <div>
        <Navbar style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50, boxShadow: '0px 1px 1px #ccc' }} className="site-navbar-wrap bg-white" color="light" light expand="md" fixed="top">
          <NavbarBrand href="/">
            <h2 className="mb-0 site-logo">Job<strong className="font-weight-bold">Finder</strong> </h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {appsNavItem}
              {loginNavItem}
            </Nav>
          </Collapse>
        </Navbar>
        <div style={{ height: 150 }}></div>
      </div>
    );
  }
}

export default withKeycloak(Menu);