import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./../login/LoginForm.js";
import '../../css/Login.css';


class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-login">
                    <h3>Entrar no MasterAula</h3>
                    <LoginForm />
                </div>
            </div>
    );
  }
}

export default LoginPage;
