import React, { Component } from "react";
import { NavLink, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, Nav } from "reactstrap";
import { Link, Route } from 'react-router-dom'
import '../../assets/css/Navigation.css';

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
              <NavItem><Link exact="true" to="/">Home</Link></NavItem>
              <NavItem><Link to="/login">Login</Link></NavItem>
              <NavItem><Link to="/register">Cadastre-se</Link></NavItem>
              </Nav>;

    let notLoggedOptions = <Nav className="ml-auto" navbar>
          <NavItem><Link exact="true" to="/">Home</Link></NavItem>
          <NavItem><Link to="/login">Login</Link></NavItem>
          <NavItem><Link to="/register">Cadastre-se</Link></NavItem>
          </Nav>;

      return(
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">MasterAula</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              {loggedOptions }
          </Collapse>
        </Navbar>
        );
	}
}

export default Menu;
