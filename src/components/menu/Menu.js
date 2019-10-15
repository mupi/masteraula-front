import React from 'react';
import {
  Navbar, NavItem, Collapse, NavbarToggler, Nav, Button, Row, Col, Container,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import logoMasterAula from 'assets/img/home/masteraula-azulverde-300x60.png';
import DocumentInfoMenuContainer from 'containers/DocumentInfoMenuContainer';
import CreateDocumentMenuContainer from 'containers/CreateDocumentMenuContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userPhoto from 'assets/img/home/avataruser3.png';

const getUserName = (userName) => {
  if (userName) {
    return (userName.split(' '))[0];
  }
  return null;
};

const Menu = (props) => {
  const {
    isOpen, isOpenSidebar, isLoggedIn, openSidebar, toggleMenu, logout, activeDocument, user, showRegisterModal, showLoginModal,
  } = props;


  const handleOpenRegisterModal = () => {
    // open modal
    showRegisterModal();
  };

  const handleOpenLoginModal = () => {
    // open modal
    showLoginModal();
  };

  const loggedOptions = (
    <Nav className="ml-auto hidden-xs" navbar>
      <NavItem>
        <Link to="/user-profile" className="masteraula-nav-header__link-myprofile">
          <div className="masteraula-nav-header__user-avatar">
            { user && user.profile_pic
              ? <img src={user.profile_pic} alt="foto-usuario" id="profile_pic" />
              : <img src={userPhoto} alt="foto-usuario" />
            }
          </div>
          {' '}
          <span className="masteraula-nav-header__icon-option" title={user ? getUserName(user.name) : ''}>{user ? getUserName(user.name) : ''}</span>
        </Link>
      </NavItem>
      <NavItem>
        <Link onClick={(e) => { e.preventDefault(); logout(); }} to="/">
          <FontAwesomeIcon
            icon="sign-out-alt"
          />
          {' '}
          <span className="masteraula-nav-header__icon-option" title="Sair">Sair</span>
        </Link>
      </NavItem>
    </Nav>
  );

  const notLoggedOptions = (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink to="/nossos-planos">
          <span className="menu-notuser__option" title="Preços">Preços</span>
        </NavLink>
      </NavItem>
      <NavItem className="text-center">
        <Button color="link" className="c-menu-button-a" onClick={handleOpenLoginModal}>
          <span className="menu-notuser__option" title="Entrar">Entrar</span>
        </Button>
      </NavItem>
      <NavItem className="text-center">
        <Button color="link" className="c-menu-button-a" onClick={handleOpenRegisterModal}>
          <span className="menu-notuser__option" title="Cadastre-se">Cadastre-se</span>
        </Button>
      </NavItem>
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
                      {activeDocument ? (
                        <DocumentInfoMenuContainer
                          documentName={activeDocument.name}
                          documentTotalQuestions={activeDocument.questions.length}
                          documentId={activeDocument.id}
                        />
                      ) : <CreateDocumentMenuContainer />}
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
              </Navbar>
            ) }
        </Col>
      </Row>
    </div>
  );
};

export default Menu;
