import React, { Component } from 'react';
import {
  Navbar, NavItem, Collapse, NavbarToggler, Nav, Button, Row, Col, Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import logoMasterAula from 'assets/img/home/masteraula-azulverde-300x60.png';
import DocumentInfoMenuContainer from 'containers/DocumentInfoMenuContainer';
import CreateDocumentMenuContainer from 'containers/CreateDocumentMenuContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userPhoto from 'assets/img/home/avataruser3.png';
import { maxDocxFreePlan } from 'helpers/config';

const getUserName = (userName) => {
  if (userName) {
    return (userName.split(' '))[0];
  }
  return null;
};


class Menu extends Component {
  componentDidMount() {
    const { getNumberDocxDownloaded, isLoggedIn, getNumberClassPlanPublicLinks } = this.props;
    if (isLoggedIn) {
      getNumberDocxDownloaded();
      getNumberClassPlanPublicLinks();
    }
  }

  render() {
    const {
      isOpen, isOpenSidebar, isLoggedIn, openSidebar, toggleMenu, logout, activeDocument,
      user, showRegisterModal, showLoginModal, quantityDocxDownloaded,
    } = this.props;

    const handleOpenRegisterModal = () => {
    // open modal
      showRegisterModal();
    };

    const handleOpenLoginModal = () => {
    // open modal
      showLoginModal();
    };

    const loggedOptions = (
      <Nav className="ml-auto hidden-xs align-items-center" navbar>
        {user && !user.subscription ? (
          <NavItem className="masteraula-nav-header__option-mr">
            <span className="masteraula-nav-header__number-docx">
              <span className="masteraula-nav-header__number-docx-freeplan">Gratuito:</span>
              {' '}
              <span className="masteraula-nav-header__number-docx-available">{quantityDocxDownloaded}</span>
              {'/'}
              <span className="masteraula-nav-header__number-docx-total">{maxDocxFreePlan}</span>
              {' '}
              <span className="masteraula-nav-header__number-docx-icon"><FontAwesomeIcon icon="file-word" /></span>
            </span>
          </NavItem>
        ) : ''}
        {user && !user.subscription ? (
          <NavItem className="masteraula-nav-header__option-mr">
            <Link className="" to="/nossos-planos">
              <Button color="info" className="masteraula-nav-header__btn-upgrade">
                <FontAwesomeIcon
                  icon="crown"
                  className="btn__icon"
                />
                {'Premium'}
              </Button>
            </Link>
          </NavItem>
        ) : ''}
        <NavItem className="masteraula-nav-header__option-mr">

          <UncontrolledDropdown className="c-sidebar__user-dropdown">
            <DropdownToggle caret size="sm" className="c-sidebar__user-dropdown-toggle masteraula-nav-header__user-toggle">
              <div className="masteraula-nav-header__user-avatar" title="Meu perfil">
                { user && user.profile_pic
                  ? <img src={user.profile_pic} alt="foto-usuario" id="profile_pic" />
                  : <img src={userPhoto} alt="foto-usuario" />
            }
              </div>
              <span className="masteraula-nav-header__icon-option masteraula-nav-header__user-name" title={user ? getUserName(user.name) : ''}>
                {user ? getUserName(user.name) : ''}
              </span>

            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className="c-sidebar__user-dropdown-item"
                to="/user-profile"
                tag={Link}
              >
                <span>
                  <FontAwesomeIcon icon="user" />
                  {' '}
                Meu Perfil
                </span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                className="c-sidebar__user-dropdown-item"
                to="/faq"
                tag={Link}
              >
                <span>
                  <FontAwesomeIcon icon="question-circle" />
                  {' '}
                Ajuda
                </span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                className="c-sidebar__user-dropdown-item"
                onClick={(e) => { e.preventDefault(); logout(); }}
                to="/"
                tag={Link}
              >
                <span>
                  <FontAwesomeIcon icon="sign-out-alt" />
                  {' '}
                Sair
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
        <NavItem className="masteraula-nav-header__option-mr">
          <Link
            className="c-sidebar__user-dropdown-item"
            to="/faq"
            title="Ajuda"
          >
            <span>
              <FontAwesomeIcon icon="question-circle" />
            </span>
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
        <NavItem>
          <NavLink to="/faq">
            <span className="menu-notuser__option" title="FAQ">FAQ</span>
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
                    <Row className="menu-top__options no-gutters">
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
  }
}

export default Menu;
