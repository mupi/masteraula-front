import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const RedefinePassword = () =>
      <div className="contenedor-forgotpassword">
            <h3><i className="fa fa-lock"></i> Mudar sua senha</h3>
            <div className="row justify-content-center">
              <Col sm="12" xs="12">
                <Form>
                  <FormGroup>
                    <Input
                      type="password"
                      name="newpassword"
                      id="newpassword"
                      placeholder="Nova senha"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="repeatpassword"
                      id="repeatpassword"
                      placeholder="Nova senha (novamente)"
                    />
                  </FormGroup>
                  <Button>Salvar</Button>
                </Form>
              </Col>
          </div>
      </div>


export default RedefinePassword;
