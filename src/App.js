import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import 'assets/css/App.css';
import 'assets/css/General.css';



import LoginModal from "components/login/LoginModal";
import RegisterModal from "components/userregister/RegisterModal";

import ForgotPasswordPage from "pages/ForgotPassword/ForgotPasswordPage";
import RedefinePasswordPage from "pages/RedefinePassword/RedefinePasswordPage";
import UserProfilePage from "pages/UserProfile/UserProfilePage";

import HomePage from "pages/Home/HomePage.js";
import QuestionPage from "pages/Question/QuestionPage";
import QuestionBasePage from "pages/QuestionBase/QuestionBasePage";
import CreateDocumentPage from "pages/CreateDocument/CreateDocumentPage";
import PreviewDocumentPage from "pages/CreateDocument/PreviewDocumentPage";

import Menu from "components/menu/Menu";
import { history } from "helpers/history"

import { resetChangePasswordForm } from "actions/forgotPasswordAction"

import Footer from "components/footer/Footer";

class App extends Component {

  constructor(props){
    super(props);

    const {dispatch} = this.props

    history.listen((location, action) => {
      dispatch(resetChangePasswordForm());
    });
  }

  render() {
      return (
        <ConnectedRouter history = { history }>
          <div id="main-masteraula-container" className={ this.props.isOpenSidebar ? 'container-open' : ''}>
            <Menu />
          { this.props.isLoggedIn?
              <Switch>
                <Route path="/home" component={QuestionBasePage}/>
                <Route path="/user-profile" component={UserProfilePage}/>
                <Route path="/view-question" component={QuestionPage}/>
                <Route path="/new-document" component={CreateDocumentPage}/>
                <Route component={HomePage}/>
               </Switch>
        :
              <Switch>

                <Route path="/login" component={LoginModal} />
                <Route path="/register" component={RegisterModal}/>
                <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                <Route path="/redefine-senha/:uid/:token" component={RedefinePasswordPage}/>
              </Switch>
          }
            <Footer year="2018" version="1.0" />
          </div>
        </ConnectedRouter>
    )
  }
}

const mapStateToProps = state => ({
  isOpenSidebar : state.menu.isOpenSidebar,
  isLoggedIn : state.login.session
})

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp
