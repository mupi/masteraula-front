import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./LoginForm.js";


class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div class="middle-box text-center loginscreen  animated fadeInDown">
                <div class="contenedor-login">
                    <div>
                        <h1 class="logo-name">

                        </h1>
                        <div><img class="imgLogo" src=""/></div>
                    </div>
                    <h3>Entrar no MasterAula</h3>
                    <LoginForm />
                </div>
            </div>
    );
  }
}

export default LoginPage;
