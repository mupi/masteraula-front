import React, { Component } from 'react';
import {
  Row, Col, ListGroup, ListGroupItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';
import maLogo from 'assets/img/home/logo_masteraula-rubrica-blanca.png';
import userPhoto from 'assets/img/home/avataruser3.png';


import FilterContainer from 'containers/FilterContainer';
import SidebarObjectFiltersContainer from 'containers/SidebarObjectFiltersContainer';
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

const clearAllSearchAndRedirect = (e, cleanAllSearch, url) => {
  e.preventDefault();
  cleanAllSearch();
  history.push(url);
};

const toogleSidebarAfterOpenModal = (e, openSidebar, isOpenSidebar) => {
  const responsiveMode = window.matchMedia('(max-width: 989px)');

  if (responsiveMode.matches) {
    e.preventDefault();
    openSidebar(isOpenSidebar);
  }
};

const SidebarMobile = ({
  showFilters, showFiltersForObjectBase, user, logout, isOpenSidebar, openSidebar, isOpen, toggleMenu, cleanAllSearch, isFetchingQuestions, hideModal, showModal,
  setQuestionIdToNewDocument,
}) => {
  const closeModal = () => {
    hideModal();
  };

  const openCreateDocumentModal = () => {
    // open modal
    setQuestionIdToNewDocument();

    showModal({
      open: true,
      closeModal,
    }, 'createDocument');
  };

  return (
    <Swipeable onSwipeRight={() => openSidebar(isOpenSidebar)} onSwipeLeft={() => openSidebar(isOpenSidebar)}>
      <div id="sidebar">
        <div id="sidebar-container">
          <div className="container-fluid">
            <Row className="sidebar-row">
              <Col xs="12" className="c-sidebar__user-info-section">
                <div className="c-sidebar__ma-logo">
                  <Link
                    className={isFetchingQuestions ? 'c-sidebar__ma-logo-link--disabled' : ''}
                    to="/#/question-base/1"
                    onClick={(e) => { if (!isFetchingQuestions) clearAllSearchAndRedirect(e, cleanAllSearch, '/question-base/1'); }}
                  >
                    <img src={maLogo} alt="masteraula" />
                  </Link>
                </div>
                <div className="c-sidebar__user-avatar">
                  { user.profile_pic
                    ? <img src={user.profile_pic} alt="foto-usuario" id="profile_pic" />
                    : <img src={userPhoto} alt="foto-usuario" />
                  }
                </div>
                <UncontrolledDropdown className="c-sidebar__user-dropdown">
                  <DropdownToggle caret size="sm" className="c-sidebar__user-dropdown-toggle">
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      className="c-sidebar__user-dropdown-item"
                      onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/user-profile'); }}
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
                      onClick={(e) => { e.preventDefault(); logout(); openSidebar(isOpenSidebar); toggleMenu(isOpen); }}
                    >
                      <span>
                        <FontAwesomeIcon icon="sign-out-alt" />
                        {' '}
                        Sair
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>

              <Col xs="12">
                <ListGroup className="sidebar-main-options c-sidebar__create-doc-option">
                  <ListGroupItem color="light">
                    <div className="document__new-document-option">
                      <div
                        className="document__new-document-btn text-center"
                        onClick={(e) => { openCreateDocumentModal(); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}
                      >
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="file"
                        />
                        Criar prova
                      </div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="list-group-item__simple-option text-center">
                    <Link to="/create-question" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/create-question'); }}>
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="plus"
                      />
                      Criar questão
                    </Link>
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
                      <Link to="/object-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/object-base/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="image"
                        />
                        Banco de objetos
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
                    {/* <ListGroupItem color="light">
                      <Link to="/my-headers/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/my-headers/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar meus cabeçalhos
                      </Link>
                    </ListGroupItem> */}
                  </ListGroup>
                  {showFilters && <FilterContainer />}
                  {showFiltersForObjectBase && <SidebarObjectFiltersContainer />}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Swipeable>
  );
};


const SidebarWeb = ({
  showFilters, showFiltersForObjectBase, isOpenSidebar, openSidebar, cleanAllSearch, isFetchingQuestions, hideModal, showModal, setQuestionIdToNewDocument,
}) => {
  const closeModal = () => {
    hideModal();
  };

  const openCreateDocumentModal = () => {
    // open modal
    setQuestionIdToNewDocument();

    showModal({
      open: true,
      closeModal,
    }, 'createDocument');
  };

  return (

    <div id="sidebar">
      <Link
        className={isFetchingQuestions ? 'c-sidebar__ma-logo-link--disabled' : ''}
        to="/#/question-base/1"
        onClick={(e) => { if (!isFetchingQuestions) clearAllSearchAndRedirect(e, cleanAllSearch, '/question-base/1'); }}
      >
        <div className="logo-top-sidebar">
          <img className="logo-sidebar" src={logoMasterAulaVerde} alt="logo" />
        </div>
      </Link>

      <div id="sidebar-container">
        <div className="container-fluid">
          <Row className="sidebar-row">
            <Col xs="12">
              <ListGroup className="sidebar-main-options c-sidebar__create-doc-option">
                <ListGroupItem color="light">
                  <div className="document__new-document-option">
                    <div
                      className="document__new-document-btn text-center"
                      onClick={(e) => { openCreateDocumentModal(); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}
                    >
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="file"
                      />
                      Criar prova
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="list-group-item__simple-option text-center">
                  <Link to="/create-question" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/create-question'); }}>
                    <FontAwesomeIcon
                      className="btn__icon"
                      icon="plus"
                    />
                    Criar questão
                  </Link>
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
                    <Link to="/object-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/object-base/1'); }}>
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="image"
                      />
                        Banco de objetos
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
                  {/* <ListGroupItem color="light">
                      <Link to="/my-headers/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/my-headers/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar meus cabeçalhos
                      </Link>
                    </ListGroupItem> */}
                </ListGroup>
                {showFilters && <FilterContainer />}
                {showFiltersForObjectBase && <SidebarObjectFiltersContainer />}

              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const {
      showFilters, showFiltersForObjectBase, activeDocument, user, logout, isOpenSidebar, openSidebar, isOpen, toggleMenu, cleanAllSearch, isFetchingQuestions,
      hideModal, showModal, setQuestionIdToNewDocument,
    } = this.props;

    // const { width } = this.state;
    // const isMobile = width <= 989;

    const responsiveMode = window.matchMedia('(max-width: 989px)');
    if (responsiveMode.matches) {
      return (
        <SidebarMobile
          showFilters={showFilters}
          showFiltersForObjectBase={showFiltersForObjectBase}
          activeDocument={activeDocument}
          user={user}
          logout={logout}
          isOpenSidebar={isOpenSidebar}
          openSidebar={openSidebar}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          cleanAllSearch={cleanAllSearch}
          isFetchingQuestions={isFetchingQuestions}
          hideModal={hideModal}
          showModal={showModal}
          setQuestionIdToNewDocument={setQuestionIdToNewDocument}
        />
      );
    }

    return (
      <SidebarWeb
        showFilters={showFilters}
        showFiltersForObjectBase={showFiltersForObjectBase}
        activeDocument={activeDocument}
        user={user}
        logout={logout}
        isOpenSidebar={isOpenSidebar}
        openSidebar={openSidebar}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        cleanAllSearch={cleanAllSearch}
        isFetchingQuestions={isFetchingQuestions}
        hideModal={hideModal}
        showModal={showModal}
        setQuestionIdToNewDocument={setQuestionIdToNewDocument}
      />
    );
  }
}

export default Sidebar;
