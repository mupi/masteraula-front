import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


const ForgotPassword = () =>
      <div className="contenedor-forgotpassword">
            <h3>Redefinição de senha</h3>
            <p>
              Informe abaixo o endereço de email o qual a conta está registrada para receber uma mensagem para a redefinição de sua senha
            </p>
            <div className="row justify-content-center">
              <Col sm="12" xs="12">
                <Form>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Ingrese seu email"
                    />
                  </FormGroup>
                  <Button>Enviar email</Button>
                </Form>
              </Col>
          </div>
          <div className="message-password-instructions">
                <h3><i className="fa fa-inbox"></i> Verifica sua caixa de entrada!</h3>
                <p>Nós enviamos um email com instruções para recuperar sua senha</p>
          </div>
      </div>


export default ForgotPassword;
