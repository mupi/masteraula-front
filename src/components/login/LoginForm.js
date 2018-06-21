import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { NavLink } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'


const LoginForm = props => {
  const { handleSubmit, error } = props

  return(
    <Col sm="12" xs="12">
      <Form onSubmit={ handleSubmit }>
        <FormGroup>
          <Field
            component="input"
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Ingrese seu email"
            className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <Field
            component="input"
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Ingrese sua senha"
            className="form-control"
          />
        </FormGroup>
        {error && <div className="errorMessage">{error}</div>}
        <div className="text-center">
            <FormGroup>
                <NavLink  to="/esqueci-senha">Esqueci minha senha</NavLink>
            </FormGroup>
            <Button type="submit">Entrar</Button>
        </div>
      </Form>
    </Col>
  )
}

export default reduxForm({
  form: 'login'
})(LoginForm)
