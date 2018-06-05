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
    if (!this.props.logged){
  		return(
  			<ul className="header">
    			<li><NavLink exact to="/">Home</NavLink></li>
    			<li><NavLink to="/login">Login</NavLink></li>
    			<li><NavLink to="/register">Cadastre-se</NavLink></li>
  			</ul>
  		);
    } else {
      return(
        <Navbar color="primary" light expand="md">
          <NavbarBrand href="/">MasterAula</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem><NavLink to="/home">Home</NavLink></NavItem>
              <NavItem><NavLink to="/login">Notificações</NavLink></NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        );
    }
	}
}

export default Menu;
