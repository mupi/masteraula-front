import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { resetForgotPasswordForm } from 'actions/forgotPasswordAction';

import 'bootstrap/dist/css/bootstrap.css';

const RedefinePassword = props => {
  const { handleSubmit } = props 

  return (
    <div className="contenedor-forgotpassword">
      <h3><i className="fa fa-lock"></i> Mudar sua senha</h3>
      <div className="row justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={ handleSubmit }>
            <FormGroup>
              <Field
                component="input"
                type="password"
                name="newpassword"
                id="newpassword"
                placeholder="Nova senha"
              />
            </FormGroup>
            <FormGroup>
              <Field
                component="input"
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
  )
}


export default reduxForm({
  form: 'redefine_password'
})(RedefinePassword)
