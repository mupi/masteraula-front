import React, { Component } from "react";
import { NavLink, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, Nav } from "reactstrap";
import { Row, Col, Container } from 'reactstrap';

import { Link, Route } from 'react-router-dom'
import 'assets/css/Navigation.css';

class Menu extends Component{
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

	render(){
    let loggedOptions = <Nav className="ml-auto" navbar>
              <NavItem><Link to="/user-profile">Meu profile</Link></NavItem>
              </Nav>;

    let notLoggedOptions = <Nav className="ml-auto" navbar>
          <NavItem><Link exact="true" to="/">Home</Link></NavItem>
          <NavItem><Link to="/login">Login</Link></NavItem>
          <NavItem><Link to="/register">Cadastre-se</Link></NavItem>
          </Nav>;

      return(
        <div id="navbar" className="container-fluid">
          <Row>
              <Col xs="12">
                <Navbar id="masteraula-nav-header" className="navbar navbar-default navbar-fixed-top" color="primary" dark expand="md">
                  <NavItem>
                    <Link exact="true" to="/">MasterAula</Link>
                  </NavItem>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                      {loggedOptions }
                  </Collapse>
                  <div className="visible-xs col-xs-3">
                    <ul className="pull-left visible-xs-inline-block nav navbar-nav">
                      <li className="sidebar-btn">
                        <a data-id="sidebar-btn" href="/">
                          <span className="icon-fontello-th-list-5 rubix-icon"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Navbar>
              </Col>
          </Row>
        </div>
        );
	}
}

export default Menu;
