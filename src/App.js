import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
}
  from 'containers';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

import Menu from 'components/menu/Menu';
import { history } from 'helpers/history';

import Footer from 'components/footer/Footer';
// CSS imported in a single place (here)
import 'assets/scss/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // const { dispatch } = this.props;

    // history.listen((location, action) => {
    // });
  }

  render() {
    const { isOpenSidebar, isLoggedIn } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div id="main-masteraula-container" className={isOpenSidebar ? 'container-open' : ''}>
          <Menu />
          {isLoggedIn
            ? (
              <Switch>
                <Route path="/question-base/:page(\d+)" component={QuestionBasePageContainer} />
                <Route path="/view-question/:id" component={QuestionPageContainer} />
                <Route path="/user-profile" component={UserProfilePageContainer} />
                <Route path="/documents/:page(\d+)" component={ViewDocumentPageContainer} />
                <Route path="/edit-document" component={EditDocumentPageContainer} />
                <Route component={NotFoundPage} />
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
  isLoggedIn: state.session.session?true:false,
});

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
