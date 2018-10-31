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
  QuestionBasePageContainer,
  EditDocumentPageContainer,
  MenuContainer,
}
  from 'containers';
import { showModal, hideModal } from 'actions/modalAction';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

import { history } from 'helpers/history';

import Footer from 'components/footer/Footer';
import ModalRoot from './ModalRoot';
// CSS imported in a single place (here)
import 'assets/scss/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'font-awesome/css/font-awesome.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope, faKey, faFileWord, faThumbtack, 
  faPlus, faMinus,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faFileWord, faThumbtack, faPlus, faMinus);

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { isOpenSidebar, isLoggedIn } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div id="main-masteraula-container" className={isOpenSidebar ? 'container-open' : ''}>
          <MenuContainer />
          {isLoggedIn
            ? (
              <Switch>
                <Route path="/question-base/:page(\d+)" component={QuestionBasePageContainer} />
                <Route path="/view-question/:id" component={QuestionPageContainer} />
                <Route path="/user-profile" component={UserProfilePageContainer} />
                <Route path="/documents/:page(\d+)" component={ViewDocumentPageContainer} />
                <Route path="/edit-document" component={EditDocumentPageContainer} />
                <Redirect from="/" to="/question-base/1" />
              </Switch>
            )
            : (
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginModal} />
                <Route path="/register" component={RegisterModal} />
                <Route path="/esqueci-senha" component={ForgotPasswordPageContainer} />
                <Route path="/redefine-senha/:uid/:token" component={RedefinePasswordPageContainer} />
                <Route path="/terms-use" component={TermsUsePage} />
                <Route path="/verify-userregister/:key" component={VerifyRegisterPageContainer} />
                <Route component={NotFoundPage} />
              </Switch>
            )
          }
          <ModalRoot />

          <Footer year="2018" version="1.0" />
        </div>
      </ConnectedRouter>
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
