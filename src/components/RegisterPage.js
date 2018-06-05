import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterForm from "./RegisterForm.js";

class RegisterPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="middle-box loginscreen  animated fadeInDown">
                <div className="contenedor-login">
                    <h3 className="text-center">Cadastre-se</h3>
                    <RegisterForm />
                </div>
            </div>
    );
  }
}

export default RegisterPage;
