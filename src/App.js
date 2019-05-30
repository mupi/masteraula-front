import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import LoginModal from 'components/login/LoginModal';
import TermsUsePage from 'pages/TermsUse/TermsUsePage';
import VerifyRegisterPageContainer from 'pages/UserRegister/VerifyRegisterPageContainer';
import HomePage from 'pages/Home/HomePage';
import CreateQuestionPage from 'pages/Question/CreateQuestionPage';

import { 
  ViewDocumentPageContainer,
  ForgotPasswordPageContainer,
  UserProfilePageContainer,
  RedefinePasswordPageContainer,
  QuestionPageContainer,
  QuestionEditPageContainer,
  CreateQuestionPageContainer,
  QuestionBasePageContainer,
  EditDocumentPageContainer,
  MenuContainer,
  MyHeadersPageContainer,
  EditHeaderPageContainer,
  PricingPageContainer,
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
import { fab } from '@fortawesome/free-brands-svg-icons';

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
  faQuestionCircle,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import ModalRoot from './ModalRoot';


library.add(faEnvelope, faKey, faFileWord, faThumbtack, faPlus, faMinus, faFile, faPencilAlt, faSyncAlt, faBars,
  faUser, faHome, faSignOutAlt, faUserCircle, faSearch, faFolder, faFileAlt, faFilter, faTrashAlt,
  faLock,
  faImage, faCheck, faCheckCircle, faSave, faThumbsUp, faAngleLeft, faAngleDown,
  faArrowCircleLeft,
  faComments, faInfoCircle, faBook, faSignInAlt, faClone, faExclamationCircle,
  faTimesCircle, faEye, faCopy, faQuestionCircle,
  fab);

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
    const { isOpenSidebar, isLoggedIn } = this.props;
    const { width } = this.state;
    const isMobile = width <= 989;

    return (
      <Router history={history}>
        <LastLocationProvider>
          <div id="main-masteraula-container" className={(isOpenSidebar && isMobile) ? 'container-open' : ''}>
            <MenuContainer />
            {isLoggedIn
              ? (
                <Switch>
                  <Route path="/question-base/:page(\d+)" component={QuestionBasePageContainer} />
                  <Route path="/view-question/:id" component={QuestionPageContainer} />
                  <Route path="/edit-question/:id" component={QuestionEditPageContainer} />
                  <Route path="/create-question/" component={CreateQuestionPageContainer} />
                  <Route path="/user-profile" component={UserProfilePageContainer} />
                  <Route path="/documents/:page(\d+)" component={ViewDocumentPageContainer} />
                  <Route path="/my-headers/:page(\d+)" component={MyHeadersPageContainer} />
                  <Route path="/edit-document" component={EditDocumentPageContainer} />
                  <Route path="/edit-header/:id" component={EditHeaderPageContainer} />
                  <Route path="/new-header" component={EditHeaderPageContainer} />
                  <Redirect from="/" to="/question-base/1" />
                </Switch>
              )
              : (
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginModal} />
                  <Route path="/nossos-planos" component={PricingPageContainer} />
                  <Route path="/esqueci-senha" component={ForgotPasswordPageContainer} />
                  <Route path="/redefine-senha/:uid/:token" component={RedefinePasswordPageContainer} />
                  <Route path="/terms-use" component={TermsUsePage} />
                  <Route path="/verify-userregister/:key" component={VerifyRegisterPageContainer} />
                  <Route component={NotFoundPage} />
                </Switch>
              )
            }
            <ModalRoot />

            <Footer year="2019" version="1.0" />
          </div>
        </LastLocationProvider>
      </Router>
    );
  }
}

App.propTypes = {
  isOpenSidebar: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isOpenSidebar: false,
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: !!state.session.session,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
