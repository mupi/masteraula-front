import React from 'react';
import RegisterForm from 'components/userregister/RegisterForm';


const RegisterPage = () => (
  <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
    <div className="contenedor-register">
      <h3 className="text-center">Cadastre-se</h3>
      <RegisterForm />
    </div>
  </div>
);
export default RegisterPage;
