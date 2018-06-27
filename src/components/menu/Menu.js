import React from "react";
import { Navbar, NavItem, Collapse, NavbarToggler, Nav, Button } from "reactstrap";
import { Row, Col } from 'reactstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'actions/loginAction'
import { toggleMenu, openSidebar } from 'actions/menuAction';
import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';

const Menu = (props) => {
  const { isOpen } = props
  const { isOpenSidebar } = props
  const { isLoggedIn } = props
  const { toggleMenu } = props
  const { openSidebar } = props
  const { logout } = props

  const loggedOptions = 
    <Nav className="ml-auto" navbar>
      <NavItem><Link to="/Home"><i className="fa fa-check"></i> Home</Link></NavItem>
      <NavItem><Link to="/user-profile"><i className="fa fa-user"></i> Meu profile</Link></NavItem>
      <NavItem><Link onClick={ (e) => {e.preventDefault(); logout() } } to="/"><i className="fa fa-sign-out"></i> Logout</Link></NavItem>
    </Nav>;

  const notLoggedOptions = 
    <Nav className="ml-auto" navbar>
      <NavItem><Link exact="true" to="/">Home</Link></NavItem>
      <LoginModal />
      <RegisterModal />
    </Nav>;

  const menu = 
    <li className="sidebar-btn">
      <Button href="/" onClick={ (e) => {
        e.preventDefault();
        openSidebar(isOpenSidebar)}
      }>
        <span><i className="fa fa-bars"></i></span>
      </Button>
    </li>;

  return(
        <div id="navbar" className="container-fluid">
          <Row>
              <Col xs="12">
                <Navbar id="masteraula-nav-header" className="navbar navbar-default navbar-fixed-top" color="primary" dark expand="md">
                  <div id="buttonSideBar" className="visible-xs col-xs-3">
                    <ul className="pull-left visible-xs-inline-block nav navbar-nav">
                      { isLoggedIn ? menu : null }
                    </ul>
                  </div>
                  <NavItem>
                    <Link exact="true" to="/">MasterAula</Link>
                  </NavItem>
                  <NavbarToggler onClick={ () => toggleMenu(isOpen) } />
                  <Collapse isOpen={ isOpen } navbar>
                      { isLoggedIn ? loggedOptions : notLoggedOptions }
                  </Collapse>
                </Navbar>
              </Col>
          </Row>
        </div>
        );
  }

/////////////////////////////////////////////// Container

const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  isOpenSidebar : state.menu.isOpenSidebar,
  isLoggedIn : state.session.session
})

const mapDispatchToProps = dispatch => ({
  toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
