import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import { fetchLogin } from 'actions/loginAction';


const LoginForm = ({dispatch}) => {
  let passwordInput
  let emailInput

  return(
    <Col sm="12" xs="12">
      <Form onSubmit={e =>{
        dispatch(fetchLogin(emailInput.value, passwordInput.value))
        e.preventDefault()
      }}>
        <FormGroup>
          <input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Ingrese seu email"
            className="form-control"
            ref ={ node => emailInput = node}
          />
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Ingrese sua senha"
            className="form-control"
            ref ={ node => passwordInput = node}
          />
        </FormGroup>
        <FormGroup>
            <NavLink  to="/esqueci-senha">Esqueci minha senha</NavLink>
        </FormGroup>
        <Button type="submit">Entrar</Button>
      </Form>
    </Col>
  )
}

export default connect()(LoginForm);
