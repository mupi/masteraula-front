import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import LoginModal from 'components/login/LoginModal';
import RegisterModal from 'components/userregister/RegisterModal';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';
import TermsUsePage from 'pages/TermsUse/TermsUsePage';
import VerifyRegisterPageContainer from 'pages/UserRegister/VerifyRegisterPageContainer';
import HomePage from 'pages/Home/HomePage.js';

import { ForgotPasswordPageContainer, UserProfilePageContainer, RedefinePasswordPageContainer, QuestionPageContainer, QuestionBasePageContainer } from 'containers';

import CreateDocumentPage from 'pages/CreateDocument/CreateDocumentPage';
import PreviewDocumentPage from 'pages/CreateDocument/PreviewDocumentPage';
import ViewDocumentPage from 'pages/ViewDocument/ViewDocumentPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

import Menu from 'components/menu/Menu';
import { history } from 'helpers/history';

import { resetChangePasswordForm } from 'actions/forgotPasswordAction';

import Footer from 'components/footer/Footer';
// CSS imported in a single place (here)
import 'assets/scss/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    history.listen((location, action) => {
    });
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div id="main-masteraula-container" className={this.props.isOpenSidebar ? 'container-open' : ''}>
          <Menu />
          { this.props.isLoggedIn
            ? (
              <Switch>
                <Route path="/question-base/:page(\d+)" component={QuestionBasePageContainer} />
                <Route path="/view-question/:id" component={QuestionPageContainer} />
                <Route path="/user-profile" component={UserProfilePageContainer} />
                <Route path="/edit-document" component={CreateDocumentPage} />
                <Route path="/documents" component={ViewDocumentPage} />
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

const mapStateToProps = state => ({
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: state.session.session,
});

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
