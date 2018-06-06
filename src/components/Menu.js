import React, { Component } from "react";
import { NavLink, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, Nav } from "reactstrap";

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
              <NavItem><NavLink href="/home">Home</NavLink></NavItem>
              <NavItem><NavLink href="/login">Notificações</NavLink></NavItem>
              <NavItem><NavLink href="/user-profile">Meu profile</NavLink></NavItem>
              </Nav>;

    let notLoggedOptions = <Nav className="ml-auto" navbar>
          <NavItem><NavLink exact="true" href="/">Home</NavLink></NavItem>
          <NavItem><NavLink href="/login">Login</NavLink></NavItem>
          <NavItem><NavLink href="/register">Cadastre-se</NavLink></NavItem>
          </Nav>;

      return(
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">MasterAula</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.logged? loggedOptions : notLoggedOptions}
          </Collapse>
        </Navbar>
        );
	}
}

export default Menu;
