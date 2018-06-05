import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import './css/App.css';
import LoginPage from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm"
import Home from "./components/Home.js";
import UserHomePage from "./components/UserHomePage.js";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import Menu from "./components/Menu";

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
            <Menu logged={true} />

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterForm}/>
              <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
              <Route path="/home" component={UserHomePage}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
