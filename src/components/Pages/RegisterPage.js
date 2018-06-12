import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterForm from "./../userregister/RegisterForm.js";
import '../../css/Register.css';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-register">
                    <h3 className="text-center">Cadastre-se</h3>
                    <RegisterForm />
                </div>
            </div>
    );
  }
}

export default RegisterPage;
