import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm"
import Home from "./components/Home.js";
import './css/App.css';


class App extends Component {
  render() {
    return (
        <HashRouter>
          <div>
            <h1>Master Aula</h1>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Cadastre-se</NavLink></li>

            </ul>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterForm}/>

            </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;
