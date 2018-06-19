import React from 'react';
import { Button, Form, FormGroup, Input, Label} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesome} from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';


const Register = () =>
      <div className="row justify-content-center">
        <Col sm="12" xs="12">
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="nome-completo"
                id="nome-completo"
                placeholder="Ingrese seu nome completo"
              />
              <span className="has-icon">


              </span>
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese seu email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese sua senha"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirme sua senha"
              />
            </FormGroup>
            <div className="text-center">
                <FormGroup check className="form-group">
                    <Label check>
                      <Input type="checkbox" />{' '}
                      Eu concordo com os termos de uso
                    </Label>
                </FormGroup>
                <FormGroup check>

                </FormGroup>
                <Button>Entrar</Button>
            </div>
          </Form>
        </Col>
    </div>

export default Register;
