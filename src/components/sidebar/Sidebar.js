import React from 'react';
import {
  Row, Col, ListGroup, ListGroupItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/masteraula-azulverde-300x60.png';

import maLogo from 'assets/img/home/logo_masteraula-rubrica-blanca.png';
import userPhoto from 'assets/img/home/avataruser3.png';

/* import FilterContainer from 'containers/FilterContainer'; */
import SidebarObjectFiltersContainer from 'containers/SidebarObjectFiltersContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swipeable } from 'react-touch';
import SidebarMenu from 'components/sidebar/SidebarMenu';

import { history } from 'helpers';

// import CustomScroll from 'react-custom-scroll';
import { maxDocxFreePlan } from 'helpers/config';


import SidebarLabels from 'components/label/SidebarLabels';

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
  /* showFilters, */
  showFiltersForObjectBase,
  user, logout, isOpenSidebar, openSidebar, isOpen, toggleMenu, cleanAllSearch, isFetchingQuestions, showCreateDocumentModal,
  quantityDocxDownloaded,
  setQuestionIdToNewDocument, myQuestionLabels, isFetchingMyQuestionLabels,
  showCreateMyQuestionLabelModal, showDeleteMyQuestionLabelModal, showUpdateMyQuestionLabelModal, addSelectedMyQuestionLabelFilter,
  showCreateClassPlanModal, selectedClassPlanType,
}) => {
  const openCreateDocumentModal = () => {
    // open modal
    setQuestionIdToNewDocument();
    showCreateDocumentModal();
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
                    to="/my-dashboard/"
                    onClick={(e) => { if (!isFetchingQuestions) clearAllSearchAndRedirect(e, cleanAllSearch, '/my-dashboard/'); }}
                  >
                    <img src={maLogo} alt="masteraula" />
                  </Link>
                </div>
                <div className="c-sidebar__user-avatar">
                  {user.profile_pic
                    ? <img src={user.profile_pic} alt="foto-usuario" id="profile_pic" />
                    : <img src={userPhoto} alt="foto-usuario" />
                  }
                  {user && !user.subscription ? (
                    <span className="c-sidebar__number-docx">
                      <span>Gratuito:</span>
                      <span className="masteraula-nav-header__number-docx-available">{quantityDocxDownloaded}</span>
                      {'/'}
                      <span className="masteraula-nav-header__number-docx-total">{maxDocxFreePlan}</span>
                      {' '}
                      <span className="masteraula-nav-header__number-docx-icon"><FontAwesomeIcon icon="file-word" /></span>
                    </span>
                  ) : ''}
                </div>
                <UncontrolledDropdown className="c-sidebar__user-dropdown">
                  <DropdownToggle caret size="sm" className="c-sidebar__user-dropdown-toggle">
                    {user.name}
                  </DropdownToggle>
                  <DropdownMenu>
                    {user && !user.subscription ? (
                      <DropdownItem
                        className="c-sidebar__user-dropdown-item"
                        onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/nossos-planos'); }}
                      >
                        <span className="masteraula-nav-header__btn-upgrade c-sidebar__user-dropdown-item--upgrade">
                          <FontAwesomeIcon
                            icon="crown"
                            className="btn__icon"
                          />
                          {'Premium'}
                        </span>
                      </DropdownItem>
                    ) : ''}

                    {!user.subscription ? <DropdownItem divider /> : ''}
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
                      onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/faq'); }}
                      to="/faq"
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
                <ListGroup className="sidebar-main-options">
                  <ListGroupItem className="list-group-item__simple-option">
                    <Link to="/my-dashboard" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/my-dashboard'); }}>
                      <FontAwesomeIcon className="btn__icon" icon="home" />
                        Painel de atividades
                    </Link>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup className="sidebar-main-options c-sidebar__create-doc-option">
                  <SidebarMenu name="Criar Materiais" iconMenu="plus">
                    <ListGroupItem color="light">
                      <div className="document__new-document-option">
                        <Button
                          className="document__new-document-btn text-left"
                          onClick={(e) => { openCreateDocumentModal(); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}
                        >
                          <FontAwesomeIcon
                            className="btn__icon"
                            icon="plus"
                          />
                          Criar prova
                        </Button>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/create-question" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/create-question'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="plus"
                        />
                        Criar questão
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/create-activity" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/create-activity'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="plus"
                        />
                        Criar atividade
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/create-classplan" onClick={(e) => { showCreateClassPlanModal(selectedClassPlanType); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="plus"
                        />
                        Criar plano de aula
                      </Link>
                    </ListGroupItem>
                  </SidebarMenu>
                </ListGroup>

                <ListGroup className="sidebar-main-options">
                  <SidebarMenu name="Gerenciar meus materiais" iconMenu="folder">
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/documents/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/documents/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                          Gerenciar minhas provas
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/class-plans/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/class-plans/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                          Gerenciar meus planos de aula
                      </Link>
                    </ListGroupItem>
                  </SidebarMenu>
                </ListGroup>
                <ListGroup className="sidebar-main-options">

                  <SidebarMenu name="Buscar questões" iconMenu="search">
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/question-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/question-base/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="search"
                        />
                        Banco de questões
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Link to="/topic-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/topic-base/1'); }}>
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="bookmark"
                        />
                        Tópicos e assuntos
                      </Link>
                    </ListGroupItem>
                  </SidebarMenu>
                  <ListGroupItem className="list-group-item__simple-option">
                    <Link to="/object-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/object-base/1'); }}>
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="image"
                      />
                        Banco de objetos
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem className="list-group-item__simple-option">
                    <Link to="/class-plans-base/1" onClick={(e) => { redirectURL(e, openSidebar, isOpenSidebar, '/class-plans-base/1'); }}>
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="image"
                      />
                        Banco de planos de aula
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
                { /* showFilters && <FilterContainer /> */}
                {showFiltersForObjectBase && <SidebarObjectFiltersContainer />}
                {<SidebarLabels
                  labels={myQuestionLabels}
                  isFetching={isFetchingMyQuestionLabels}
                  showCreateMyQuestionLabelModal={showCreateMyQuestionLabelModal}
                  showUpdateMyQuestionLabelModal={showUpdateMyQuestionLabelModal}
                  showDeleteMyQuestionLabelModal={showDeleteMyQuestionLabelModal}
                  addSelectedMyQuestionLabelFilter={addSelectedMyQuestionLabelFilter}
                  isFetchingQuestions={isFetchingQuestions}
                />}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Swipeable>
  );
};

const menuMainOptions = [
  {
    id: 1,
    name: 'Criar Materiais',
    iconMenu: 'plus',
  },

  {
    id: 2,
    name: 'Gerenciar meus materiais',
    iconMenu: 'folder',
  },

  {
    id: 3,
    name: 'Buscar questões',
    iconMenu: 'search',
  },
];

const SidebarWeb = ({
  /* showFilters, */
  showFiltersForObjectBase,
  isOpenSidebar, openSidebar, cleanAllSearch, isFetchingQuestions, showCreateDocumentModal,
  setQuestionIdToNewDocument, myQuestionLabels, isFetchingMyQuestionLabels,
  showCreateMyQuestionLabelModal, showDeleteMyQuestionLabelModal, showUpdateMyQuestionLabelModal, addSelectedMyQuestionLabelFilter,
  showCreateClassPlanModal, selectedClassPlanType,
  sidebarOptionSelected, idSidebar,
}) => {
  const openCreateDocumentModal = () => {
    // open modal
    setQuestionIdToNewDocument();
    showCreateDocumentModal();
  };

  return (

    <div id="sidebar">
      <Link
        className={isFetchingQuestions ? 'c-sidebar__ma-logo-link--disabled' : ''}
        to="/my-dashboard/"
        onClick={(e) => { if (!isFetchingQuestions) clearAllSearchAndRedirect(e, cleanAllSearch, '/my-dashboard/'); }}
      >
        <div className="logo-top-sidebar">
          <img className="logo-sidebar" src={logoMasterAulaVerde} alt="logo" />
        </div>
      </Link>

      <div id="sidebar-container">
        { /* <CustomScroll heightRelativeToParent="calc(100% + 70px)"> */}
        <div className="container-fluid">
          <div className="sidebar-10vh">
            <Row className="sidebar-row">
              <Col xs="12">

                <ListGroup className="sidebar-main-options">
                  <ListGroupItem className="list-group-item__simple-option">
                    <NavLink to="/my-dashboard" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(null)}>
                      <FontAwesomeIcon className="btn__icon" icon="home" />
                        Painel de atividades
                    </NavLink>
                  </ListGroupItem>
                </ListGroup>

                <ListGroup className="sidebar-main-options c-sidebar__create-doc-option ">
                  <SidebarMenu
                    name={menuMainOptions[0].name}
                    iconMenu={menuMainOptions[0].iconMenu}
                    idMenuOption={menuMainOptions[0].id}
                    idSidebar={idSidebar}
                  >
                    <ListGroupItem color="light">
                      <div className="document__new-document-option">
                        <Button
                          color="link"
                          className="document__new-document-btn text-left"
                          onClick={(e) => { openCreateDocumentModal(); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}
                        >
                          <span className="ml-2">
                            <FontAwesomeIcon className="btn__icon" icon="plus" />
                            Criar prova
                          </span>
                        </Button>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/create-question" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[0].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="plus" />
                          Criar questão
                        </span>
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/create-object" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[0].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="plus" />
                          Criar objeto
                        </span>
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/create-activity" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[0].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon
                            className="btn__icon"
                            icon="plus"
                          />
                          Criar atividade
                        </span>
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <Button
                        color="link"
                        onClick={() => showCreateClassPlanModal(selectedClassPlanType)}
                        className="document__new-document-btn text-left"
                      >
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="plus" />
                            Criar plano de aula
                        </span>
                      </Button>
                    </ListGroupItem>
                  </SidebarMenu>
                </ListGroup>

                <ListGroup className="sidebar-main-options">
                  <SidebarMenu
                    name={menuMainOptions[1].name}
                    iconMenu={menuMainOptions[1].iconMenu}
                    idMenuOption={menuMainOptions[1].id}
                    idSidebar={idSidebar}
                  >
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/documents/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[1].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="folder" />
                          Gerenciar minhas provas
                        </span>
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/class-plans/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[1].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="folder" />
                          Gerenciar meus planos de aula
                        </span>
                      </NavLink>
                    </ListGroupItem>
                  </SidebarMenu>
                </ListGroup>

                <ListGroup className="sidebar-main-options">
                  <SidebarMenu
                    name={menuMainOptions[2].name}
                    iconMenu={menuMainOptions[2].iconMenu}
                    idMenuOption={menuMainOptions[2].id}
                    idSidebar={idSidebar}
                  >
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/question-base/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[2].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="search" />
                          Banco de questões
                        </span>
                      </NavLink>
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item__simple-option">
                      <NavLink to="/topic-base/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(menuMainOptions[2].id)}>
                        <span className="ml-2">
                          <FontAwesomeIcon className="btn__icon" icon="bookmark" />
                          Tópicos e assuntos
                        </span>
                      </NavLink>
                    </ListGroupItem>
                  </SidebarMenu>
                  <ListGroupItem className="list-group-item__simple-option">
                    <NavLink to="/activity-base/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(null)}>
                      <FontAwesomeIcon className="btn__icon" icon="search" />
                          Banco de atividades
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem className="list-group-item__simple-option">
                    <NavLink to="/object-base/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(null)}>
                      <FontAwesomeIcon className="btn__icon" icon="search" />
                          Banco de objetos
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem className="list-group-item__simple-option">
                    <NavLink to="/class-plans-base/1" activeClassName="menu__option-sidebar--active" onClick={() => sidebarOptionSelected(null)}>
                      <FontAwesomeIcon className="btn__icon" icon="search" />
                          Banco de Planos de aula
                    </NavLink>
                  </ListGroupItem>
                  {/* <ListGroupItem color="light">
                      <Link to="/my-headers/1">
                        <FontAwesomeIcon
                          className="btn__icon"
                          icon="folder"
                        />
                        Gerenciar meus cabeçalhos
                      </Link>
                    </ListGroupItem> */}
                </ListGroup>
                {/* showFilters && <FilterContainer /> */}
                {showFiltersForObjectBase && <SidebarObjectFiltersContainer />}
                {<SidebarLabels
                  labels={myQuestionLabels}
                  isFetching={isFetchingMyQuestionLabels}
                  showCreateMyQuestionLabelModal={showCreateMyQuestionLabelModal}
                  showUpdateMyQuestionLabelModal={showUpdateMyQuestionLabelModal}
                  showDeleteMyQuestionLabelModal={showDeleteMyQuestionLabelModal}
                  addSelectedMyQuestionLabelFilter={addSelectedMyQuestionLabelFilter}
                  isFetchingQuestions={isFetchingQuestions}
                />}
              </Col>
            </Row>
          </div>

        </div>
        { /* </CustomScroll> */}
      </div>
    </div>
  );
};


class Sidebar extends React.PureComponent {
  // constructor() {
  //   super();
  //   this.state = {
  //     width: window.innerWidth,
  //   };
  // }

  // UNSAFE_componentWillMount() {
  //   window.addEventListener('resize', this.handleWindowSizeChange);
  // }

  // make sure to remove the listener
  // when the component is not mounted anymore
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowSizeChange);
  // }

  // handleWindowSizeChange = () => {
  //   this.setState({ width: window.innerWidth });
  // };
  componentDidMount() {
    const {
      listMyQuestionLabels, myQuestionLabels,
    } = this.props;

    if (!myQuestionLabels) { listMyQuestionLabels(); }
  }

  render() {
    // const { width } = this.state;
    // const isMobile = width <= 989;

    const responsiveMode = window.matchMedia('(max-width: 989px)');
    if (responsiveMode.matches) {
      return (
        <SidebarMobile {...this.props} />
      );
    }

    return (
      <SidebarWeb {...this.props} />
    );
  }
}

export default Sidebar;
