import React from 'react';
import {
  Button, Form, FormGroup, Col, Input
} from 'reactstrap';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { toggleModal } from 'actions/loginAction';
import { resetForgotPasswordForm } from 'actions/forgotPasswordAction';


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
    />
    { touched
      && ((error && (
      <span className="error-message-text">
        {error}
      </span>
      ))
      || (warning && (
      <span>
        {' '}
        {warning}
        {' '}
      </span>
      )))
    }
  </div>
);

const LoginForm = (props) => {
  const {
    handleSubmit, error, modal, toggleModal,
  } = props;

  return (
    <Col sm="12" xs="12">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            component="input"
            type="email"
            name="email"
            id="exampleEmail"
            label="Digite seu email"
            className="form-control login-field"
            component={renderField}

          />
        </FormGroup>
        <FormGroup>
          <Field
            component="input"
            type="password"
            name="password"
            id="examplePassword"
            label="Digite sua senha"
            className="form-control login-field"
            component={renderField}

          />
        </FormGroup>
        {error && (
        <Alert color="danger">
          {error}
        </Alert>
        )}
        <div className="text-center">
          <FormGroup>
            <NavLink to="/esqueci-senha" onClick={() => toggleModal(modal)}>
              Esqueci minha senha
            </NavLink>
          </FormGroup>
          <Button type="submit">
              Entrar
          </Button>
        </div>
      </Form>
    </Col>
  );
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Insira seu email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ' email sem formato correto'
  }

  if (!values.password) {
    errors.password = ' Insira sua senha';
  }
  return errors;
}

const mapStateToProps = state => ({
  modal: state.login.modal,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: (modal) => {
    dispatch(toggleModal(modal));
    dispatch(resetForgotPasswordForm());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
  validate,
})(LoginForm));
