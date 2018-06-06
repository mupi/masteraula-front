import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { Container, Row, Col } from 'reactstrap';


class LoginForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Ingrese sua senha"
              />
            </FormGroup>
            <FormGroup>
                <NavLink  to="/esqueci-senha">Esqueci minha senha</NavLink>
            </FormGroup>
            <Button>Entrar</Button>
          </Form>
        </Col>


    );
  }
}

export default LoginForm;
