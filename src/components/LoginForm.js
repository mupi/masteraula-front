import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

class LoginForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Ingrese seu email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
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
        </div>
    </div>



    );
  }
}

export default LoginForm;
