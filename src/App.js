import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
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

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }

  render() {
    let logged = false
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
        </BrowserRouter>
    );
  }
}

export default App;
