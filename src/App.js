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

class App extends Component {

  constructor(props){
    super(props);

    const {dispatch} = this.props
    this.state={
      loginPage:[],
      uploadScreen:[],
      isOpenSidebar: false
    }

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);

    history.listen((location, action) => {
      // clear alert on location change
      // dispatch(alertActions.clear());
    });
  }


    // This method will be sent to the child component
     handler(e) {
        e.preventDefault();
         this.setState({
             isOpenSidebar: !this.state.isOpenSidebar
         });
     }


  render() {
    //const { user } = this.props;
    let user = true;
    return (
        <ConnectedRouter history = { history }>
          <div id="main-masteraula-container" className={this.state.isOpenSidebar ? 'container-open' : ''}>
            <Menu user={user}  openSidebar={this.handler} />
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                    <Route path="/home" component={QuestionBasePage}/>
                    <Route path="/user-profile" component={UserProfilePage}/>
                    <Route path="/view-question" component={QuestionPage}/>
                    <Route path="/new-document" component={CreateDocumentPage}/>
                  </Switch>
            <Footer year="2018" version="1.0" />
          </div>
        </ConnectedRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.login;
  return {
    user
  };
}

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp
