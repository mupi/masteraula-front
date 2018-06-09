import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import './css/App.css';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"
import Home from "./components/Home.js";
import UserProfilePage from "./components/UserProfilePage.js";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
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
    return (
        <BrowserRouter>
          <div>
            <Menu logged={false} />
            <Row style={{'margin':'10px auto'}}>
              <Col xs='2'>
                <Sidebar />
              </Col>
              <Col>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/login" component={LoginPage}/>
                  <Route path="/register" component={RegisterPage}/>
                  <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
                  <Route path="/home" component={BancoQuestoesPage}/>
                  <Route path="/user-profile" component={UserProfilePage}/>
                  <Route path="/view-question" component={QuestionPage}/>
                </Switch>
              </Col>
            </Row>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
