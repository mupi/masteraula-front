import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { toggleModal } from 'actions/loginAction';


const LoginForm = props => {
  const { handleSubmit, error, modal, toggleModal } = props

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
                <NavLink  to="/esqueci-senha" onClick={ () => toggleModal(modal) }>Esqueci minha senha</NavLink>
            </FormGroup>
            <Button type="submit">Entrar</Button>
        </div>
      </Form>
    </Col>
  )
}

const mapStateToProps = state => ({
  modal : state.login.modal
})

const mapDispatchToProps = dispatch => ({
  toggleModal : modal => dispatch(toggleModal(modal))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(reduxForm({
  form: 'login'
})(LoginForm))
