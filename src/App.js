import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { Row, Col, Container } from 'reactstrap';
import './css/App.css';

import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage"
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import UserProfilePage from "./components/UserProfilePage";

import Home from "./components/Home.js";
import QuestionPage from "./components/QuestionPage";
import BancoQuestoesPage from "./components/BancoQuestoesPage";

import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import { history } from "./helpers/history"

class App extends Component {

  constructor(props){
    super(props);

    const {dispatch} = this.props
    this.state={
      loginPage:[],
      uploadScreen:[]
    }

    history.listen((location, action) => {
      // clear alert on location change
      // dispatch(alertActions.clear());
    });
  }

  render() {
    const { user } = this.props;
    return (
        <ConnectedRouter history = { history }>
          <div>
            <Menu user={user} />
            <Row style={{'margin':'10px auto'}}>
              {user ?
                <Col xs='2'>
                <Sidebar />
              </Col> : ''}
              <Container>
                  <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                    <Route path="/home" component={BancoQuestoesPage}/>
                    <Route path="/user-profile" component={UserProfilePage}/>
                    <Route path="/view-question" component={QuestionPage}/>

                  </Switch>
                  </Container>

            </Row>

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
