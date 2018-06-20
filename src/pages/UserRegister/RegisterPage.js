import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterForm from "components/userregister/RegisterForm.js";
import 'assets/css/Register.css';

const RegisterPage = () =>
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-register">
                    <h3 className="text-center">Cadastre-se</h3>
                    <RegisterForm />
                </div>
            </div>


export default RegisterPage;
