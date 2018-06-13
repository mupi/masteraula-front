import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import { Row, Col, Container } from 'reactstrap';
import './assets/css/App.css';

import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/UserRegister/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import UserProfilePage from "./pages/UserProfile/UserProfilePage";

import HomePage from "./pages/Home/HomePage.js";
import QuestionPage from "./pages/Question/QuestionPage";
import QuestionBasePage from "./pages/QuestionBase/QuestionBasePage";

import Menu from "./components/menu/Menu";
import Sidebar from "./components/sidebar/Sidebar";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }

  render() {
    let logged = true
    return (
        <BrowserRouter>
          <div>
            <Menu logged={logged} />
            <Row style={{'margin':'10px auto'}}>
              {logged ?
                <Col xs='2'>
                <Sidebar />
              </Col> : ''}
              <Container>
                  <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                    <Route path="/home" component={QuestionBasePage}/>
                    <Route path="/user-profile" component={UserProfilePage}/>
                    <Route path="/view-question" component={QuestionPage}/>

                  </Switch>
                  </Container>

            </Row>

          </div>
        </BrowserRouter>
    );
  }
}

export default App;
