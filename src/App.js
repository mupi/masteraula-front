import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import './css/App.css';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"
import Home from "./components/Home.js";
import UserHomePage from "./components/UserHomePage.js";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import UserProfilePage from "./components/UserProfilePage";

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
            <Menu logged={false} />

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
              <Route path="/home" component={UserHomePage}/>
              <Route path="/user-profile" component={UserProfilePage}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
