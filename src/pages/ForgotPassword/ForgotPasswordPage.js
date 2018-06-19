import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ForgotPassword from 'components/forgotpassword/ForgotPassword';


const ForgotPasswordPage= () =>
            <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
                <div className="contenedor-forgotpassword">
                    <h3>Redefinição de senha</h3>
                    <p>
                      Informe abaixo o endereço de email o qual a conta está registrada para receber uma mensagem para a redefinição de sua senha
                    </p>
                    <ForgotPassword />
                </div>
            </div>

export default ForgotPasswordPage;
