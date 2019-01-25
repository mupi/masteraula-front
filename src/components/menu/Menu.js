import React from 'react';
import {
  Navbar, NavItem, Collapse, NavbarToggler, Nav, Button, Row, Col, Container,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';
import logoMasterAula from 'assets/img/home/masteraula-300x60.png';
import DocumentInfoSidebarContainer from 'containers/DocumentInfoSidebarContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userPhoto from 'assets/img/home/avataruser3.png';

const getUserName = (userName) => {
  if (userName) {
    return (userName.split(' '))[0];
  }
  return null;
}

const Menu = (props) => {
  const {
    isOpen, isOpenSidebar, isLoggedIn, openSidebar, toggleMenu, logout, activeDocument, user,
  } = props;

  const loggedOptions = (
    <Nav className="ml-auto hidden-xs" navbar>
      <NavItem className="masteraula-nav-header__greeting">
        <div className="masteraula-nav-header__user-avatar">
          <img src={userPhoto} alt="foto-usuario" />
        </div>
        Oi
        {' '}
        {getUserName(user.name)}
        {'!'}
      </NavItem>
      <NavItem>
        <Link to="/user-profile">
          <FontAwesomeIcon
            icon="user"
          />
          {' '}
          Meu Perfil
        </Link>
      </NavItem>
      <NavItem>
        <Link onClick={(e) => { e.preventDefault(); logout(); }} to="/">
          <FontAwesomeIcon
            icon="sign-out-alt"
          />
          {' '}
          Sair
        </Link>
      </NavItem>
    </Nav>
  );

  const notLoggedOptions = (
    <Nav className="ml-auto" navbar>
      <NavItem className="hidden">
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
          <FontAwesomeIcon
            icon="bars"
          />
        </span>
      </Button>
    </li>
  );

  return (
    <div id="navbar" className="container-fluid">
      <Row>
        <Col xs="12">
          { isLoggedIn
            ? (
              <Navbar id="masteraula-nav-header" className="masteraula-nav-header__user navbar navbar-default navbar-fixed-top" dark expand="md">
                <Container className="menu-top" fluid>
                  <Row className="menu-top__options">
                    <div id="buttonSideBar" className="visible-xs col-xs-3">
                      <ul className="pull-left visible-xs-inline-block nav navbar-nav">
                        { isLoggedIn ? menu : null }
                      </ul>
                    </div>
                    <Col sm="8" xs="9" className="d-flex align-items-center menu-top__document-section">
                      {activeDocument && (
                        <DocumentInfoSidebarContainer
                          documentName={activeDocument.name}
                          documentTotalQuestions={activeDocument.questions.length}
                          documentId={activeDocument.id}
                        />
                      )}
                    </Col>
                    <Collapse isOpen={isOpen} navbar className="col-xs-collapse-right  text-right col-sm-4">
                      { loggedOptions }
                    </Collapse>
                  </Row>
                </Container>
              </Navbar>
            ) : (
              <Navbar id="masteraula-nav-header" className="masteraula-nav-header__notuser navbar navbar-default navbar-fixed-top" dark expand="md">
                <NavItem>
                  <Link exact="true" to="/">
                    <img className="logo-in-menu no-login" src={logoMasterAula} alt="logo" />
                  </Link>
                </NavItem>
                <NavbarToggler onClick={() => toggleMenu(isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                  { notLoggedOptions }
                </Collapse>
              </Navbar>) }
        </Col>
      </Row>
    </div>
  );
};

export default Menu;
