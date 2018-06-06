import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ForgotPassword from "./ForgotPassword.js";


class ForgotPasswordPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-login">
                    <h3>Redefinição de senha</h3>
                    <p>Informe abaixo o endereço de email o qual a conta está registrada para receber uma mensagem para a redefinição de sua senha
</p>
                    <ForgotPassword />
                </div>
            </div>
    );
  }
}

export default ForgotPasswordPage;
