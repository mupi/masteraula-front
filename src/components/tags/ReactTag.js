import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';
import TermsUsePage from 'pages/TermsUse/TermsUsePage';
import VerifyRegisterPageContainer from 'pages/UserRegister/VerifyRegisterPageContainer';
import HomePage from 'pages/Home/HomePage';

import {
  ViewDocumentPageContainer,
  ForgotPasswordPageContainer,
  UserProfilePageContainer,
  RedefinePasswordPageContainer,
  QuestionPageContainer,
  QuestionEditPageContainer,
  QuestionBasePageContainer,
  EditDocumentPageContainer,
  MenuContainer,
  MyHeadersPageContainer,
  EditHeaderPageContainer,
}
  from 'containers';
import { showModal, hideModal } from 'actions/modalAction';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

import { history } from 'helpers/history';

import Footer from 'components/footer/Footer';
// CSS imported in a single place (here)
import 'assets/scss/styles.css';
import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope, faKey, faFileWord, faThumbtack,
  faFile, faPencilAlt, faSyncAlt, faSave, faTrashAlt,
  faBars,
  faPlus, faMinus,
  faUser, faHome, faSignOutAlt, faUserCircle,
  faSearch, faFolder, faFileAlt, faFilter,
  faAngleLeft, faAngleDown,
  faImage, faCheck, faCheckCircle,
  faThumbsUp,
  faArrowCircleLeft,
  faComments, faInfoCircle, faBook,
  faSignInAlt, faClone, faExclamationCircle,
  faTimesCircle,
  faEye,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import ModalRoot from './ModalRoot';

import ReactTags  from 'react-tag-autocomplete';

library.add(faEnvelope, faKey, faFileWord, faThumbtack, faPlus, faMinus, faFile, faPencilAlt, faSyncAlt, faBars,
  faUser, faHome, faSignOutAlt, faUserCircle, faSearch, faFolder, faFileAlt, faFilter, faTrashAlt,
  faImage, faCheck, faCheckCircle, faSave, faThumbsUp, faAngleLeft, faAngleDown,
  faArrowCircleLeft,
  faComments, faInfoCircle, faBook, faSignInAlt, faClone, faExclamationCircle,
  faTimesCircle, faEye, faCopy);

class App extends React.Component {
  constructor (props) {
    super(props)
 
    this.state = {
      tags: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Pears" }
      ],
      suggestions: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
      ]
    }
  }
 
  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }
 
  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }
 
  render () {
    return (
      <ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)} 
        placeholder="novo tag"
        allowNew
        delimiterChars={[',']}
        />
    )
  }
}

const mapStateToProps = state => ({
 // isOpenSidebar: state.menu.isOpenSidebar,
 // isLoggedIn: !!state.session.session,
});

const mapDispatchToProps = dispatch => ({
//  hideModal: () => dispatch(hideModal()),
 // showModal: (modalProps, modalType) => {
  //  dispatch(showModal({ modalProps, modalType }));
  //},
});

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
