import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"
import Home from "./components/Home.js";
import './css/App.css';
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import 'bootstrap/dist/css/bootstrap.css';


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
        <HashRouter>
          <div>
            <h1>Master Aula</h1>
            <nav className="navbar navbar-expand-md bg-azul-ma">
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mr-auto header">
                    <li className="nav-item"><NavLink className="nav-link" exact to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                    <li className="nav-item"><NavLink to="/register">Cadastre-se</NavLink></li>
                  </ul>
                </div>
          </nav>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/esqueci-senha" component={ForgotPasswordPage}/>
            </div>
          </div>
        </HashRouter>
    );
  }
}

export default App;
