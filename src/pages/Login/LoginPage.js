import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "../../components/login/LoginForm.js";
import '../../assets/css/Login.css';


const LoginPage = () =>
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-login">
                    <h3>Entrar no MasterAula</h3>
                    <LoginForm />
                </div>
            </div>

export default LoginPage;
