import React from 'react';
import {
  Row, Col, ListGroup, ListGroupItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';
import userPhoto from 'assets/img/home/avataruser3.png';

import CreateDocumentModalContainer from 'containers/CreateDocumentModalContainer';
import FilterContainer from 'containers/FilterContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swipeable } from 'react-touch';

import { history } from 'helpers/history';

const redirectURL = (e, openSidebar, isOpenSidebar, url) => {
  const responsiveMode = window.matchMedia('(max-width: 989px)');

  if (responsiveMode.matches) {
    e.preventDefault();
    openSidebar(isOpenSidebar);
    history.push(url);
  }
};

const Sidebar = (props) => {
  const {
    showFilters, activeDocument, user, logout, isOpenSidebar, openSidebar, isOpen, toggleMenu,
  } = props;

  const responsiveMode = window.matchMedia('(max-width: 989px)');

  if (responsiveMode.matches){
  return (
    <Swipeable onSwipeRight={() => openSidebar(isOpenSidebar)} onSwipeLeft={() => openSidebar(isOpenSidebar)}>
      <div id="sidebar">
        <div className="logo-top-sidebar">
          <img className="logo-sidebar" src={logoMasterAulaVerde} alt="logo" />
        </div>
        <div id="sidebar-container">
          <div className="container-fluid">
            <Row className="sidebar-row">
              <Col xs="12" className="c-sidebar__user-info-section visible-xs">
                <div className="c-sidebar__user-avatar">
                  <FontAwesomeIcon icon="user-circle" className="hidden" />
                  <img src={userPhoto} alt="foto-usuario" />
                </div>
                <UncontrolledDropdown className="c-sidebar__user-dropdown">
                  <DropdownToggle caret size="sm" className="c-sidebar__user-dropdown-toggle">
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="c-sidebar__user-dropdown-item">
                      <Link
                        className="c-sidebar__link-my-profile"
                        onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/user-profile'); }}
                        to="/user-profile"
                      >
                        <FontAwesomeIcon icon="user" />
                        {' '}
                        Meu Perfil
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="c-sidebar__user-dropdown-item">
                      <Link
                        className="c-sidebar__link-my-profile"
                        onClick={(e) => { e.preventDefault(); logout(); openSidebar(isOpenSidebar); toggleMenu(isOpen); }}
                        to="/"
                      >
                        <FontAwesomeIcon icon="sign-out-alt" />
                        {' '}
                        Sair
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>

              <Col xs="12">
                <ListGroup className="sidebar-main-options c-sidebar__create-doc-option">
                  <ListGroupItem color="light">
                    <CreateDocumentModalContainer activeDocument={activeDocument} />
                  </ListGroupItem>
                </ListGroup>
                <div className="sidebar-nav-container">
                  <ListGroup className="sidebar-main-options">
                    <ListGroupItem color="light">
                      <Link to="/question-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/question-base/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="search"
                        />
                        Banco de questões
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem color="light">
                      <Link to="/documents/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/documents/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar minhas provas
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem color="light">
                      <Link to="/my-headers/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/my-headers/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar meus cabeçalhos
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                  {showFilters && <FilterContainer />}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Swipeable>

  );}


  return (
      <div id="sidebar">
        <div className="logo-top-sidebar">
          <img className="logo-sidebar" src={logoMasterAulaVerde} alt="logo" />
        </div>
        <div id="sidebar-container">
          <div className="container-fluid">
            <Row className="sidebar-row">
              <Col xs="12" className="c-sidebar__user-info-section visible-xs">
                <div className="c-sidebar__user-avatar">
                  <FontAwesomeIcon icon="user-circle" className="hidden" />
                  <img src={userPhoto} alt="foto-usuario" />
                </div>
                <UncontrolledDropdown className="c-sidebar__user-dropdown">
                  <DropdownToggle caret size="sm" className="c-sidebar__user-dropdown-toggle">
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem className="c-sidebar__user-dropdown-item">
                      <Link
                        className="c-sidebar__link-my-profile"
                        onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/user-profile'); }}
                        to="/user-profile"
                      >
                        <FontAwesomeIcon icon="user" />
                        {' '}
                        Meu Perfil
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="c-sidebar__user-dropdown-item">
                      <Link
                        className="c-sidebar__link-my-profile"
                        onClick={(e) => { e.preventDefault(); logout(); openSidebar(isOpenSidebar); toggleMenu(isOpen); }}
                        to="/"
                      >
                        <FontAwesomeIcon icon="sign-out-alt" />
                        {' '}
                        Sair
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>

              <Col xs="12">
                <ListGroup className="sidebar-main-options c-sidebar__create-doc-option">
                  <ListGroupItem color="light">
                    <CreateDocumentModalContainer activeDocument={activeDocument} />
                  </ListGroupItem>
                </ListGroup>
                <div className="sidebar-nav-container">
                  <ListGroup className="sidebar-main-options">
                    <ListGroupItem color="light">
                      <Link to="/question-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/question-base/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="search"
                        />
                        Banco de questões
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem color="light">
                      <Link to="/documents/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/documents/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar minhas provas
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem color="light">
                      <Link to="/my-headers/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/my-headers/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar meus cabeçalhos
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                  {showFilters && <FilterContainer />}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>)
};

export default Sidebar;
