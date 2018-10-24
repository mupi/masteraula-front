import React from 'react';
import {
  Navbar, NavItem, Collapse, NavbarToggler, Nav, Button, Row, Col,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';
import logoMasterAula from 'assets/img/home/masteraula-300x60.png';
import DocumentInfoSidebar from 'components/sidebar/DocumentInfoSidebar';

const Menu = (props) => {
  const {
    isOpen, isOpenSidebar, isLoggedIn, openSidebar, toggleMenu, logout, activeDocument,
  } = props;



  const loggedOptions = (
    <Nav className="ml-auto" navbar>

   

      <NavItem> 
        <Link to="/question-base/1">
          <i className="fa fa-home" />
          {' '}
          Página Inicial
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/user-profile">
          <i className="fa fa-user" />
          {' '}
          Meu Perfil
        </Link>
      </NavItem>
      <NavItem>
        <Link onClick={(e) => { e.preventDefault(); logout(); }} to="/">
          <i className="fa fa-sign-out" />
          {' '}
          Sair
        </Link>
      </NavItem>
    </Nav>
  );

  const notLoggedOptions = (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link exact="true" to="/">
          Página Inicial
        </Link>
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
      <RegisterModal />
    </Nav>
  );

  const menu = (
    <li className="sidebar-btn">
      <Button
        href="/"
        onClick={(e) => {
          e.preventDefault();
          openSidebar(isOpenSidebar);
        }
      }
      >
        <span>
          <i className="fa fa-bars" />
        </span>
      </Button>
    </li>
  ); 
  const navBarUserHome = ( isLoggedIn ? 'masteraula-nav-header__user navbar navbar-default navbar-fixed-top': 'navbar navbar-default navbar-fixed-top');

  return (

    <div id="navbar" className="container-fluid">
      <Row>
        <Col xs="12">
          <Navbar id="masteraula-nav-header" className={navBarUserHome} color="primary" dark expand="md">
            <div id="buttonSideBar" className="visible-xs col-xs-3">
              <ul className="pull-left visible-xs-inline-block nav navbar-nav">
                { isLoggedIn ? menu : null }
              </ul>
            </div>
            <NavItem>
              <Link exact="true" to="/">
                {isLoggedIn ? '' : <img className="logo-in-menu no-login" src={logoMasterAula} alt="logo" />}
              </Link>
            </NavItem>
            <NavbarToggler onClick={() => toggleMenu(isOpen)} />


    {isLoggedIn && activeDocument && (
      <DocumentInfoSidebar
        documentName={activeDocument.name}
        documentTotalQuestions={activeDocument.questions.length}
        documentId={activeDocument.id}
      />
      )}
            <Collapse isOpen={isOpen} navbar>

              { isLoggedIn ? loggedOptions : notLoggedOptions }
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};

export default Menu;