import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { Row, Col, Container } from 'reactstrap';
import 'assets/css/App.css';

import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/UserRegister/RegisterPage"
import ForgotPasswordPage from "pages/ForgotPassword/ForgotPasswordPage";
import UserProfilePage from "pages/UserProfile/UserProfilePage";

import HomePage from "pages/Home/HomePage.js";
import QuestionPage from "pages/Question/QuestionPage";
import QuestionBasePage from "pages/QuestionBase/QuestionBasePage";
import CreateDocumentPage from "pages/CreateDocument/CreateDocumentPage";
import PreviewDocumentPage from "pages/CreateDocument/PreviewDocumentPage";

import Menu from "components/menu/Menu";
import Sidebar from "components/sidebar/Sidebar";
import { history } from "helpers/history"

import Footer from "components/footer/Footer";
// import { isLoggedIn } from "./helpers/session";

class App extends Component {

  constructor(props){
    super(props);

    const {dispatch} = this.props

    history.listen((location, action) => {
      // clear alert on location change
      // dispatch(alertActions.clear());
    });
  }

  render() {
    if (this.props.isLoggedIn){
      return (
        <ConnectedRouter history = { history }>
          <div id="main-masteraula-container" className={ this.props.isOpenSidebar ? 'container-open' : ''}>
            <Menu />
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/user-profile" component={UserProfilePage}/>
                    <Route path="/view-question" component={QuestionPage}/>
                    <Route path="/new-document" component={CreateDocumentPage}/>
                  </Switch>
            <Footer year="2018" version="1.0" />
          </div>
        </ConnectedRouter>
    );
    }
    return (
        <ConnectedRouter history = { history }>
          <div id="main-masteraula-container" className={ this.props.isOpenSidebar ? 'container-open' : ''}>
            <Menu />
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                    <Route path="/home" component={QuestionBasePage}/>
                  </Switch>
            <Footer year="2018" version="1.0" />
          </div>
        </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  isOpenSidebar : state.menu.isOpenSidebar,
  isLoggedIn : state.login.session
})

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp
