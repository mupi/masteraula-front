import React from 'react';
import {
  Alert, Button, Form, FormGroup, Col, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { resendEmail } from 'actions/registerAction';


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
    handleSubmit, error, modal, toggleModal, resendEmail, formValues,
    resendError, resendSuccess,
  } = props;

  function handleResend(message, values) {
    if (message.includes('confirmado')) {
      resendEmail(values.email, values.password);
    }
  }

  return (
    <Col sm="12" xs="12">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
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
            type="password"
            name="password"
            id="examplePassword"
            label="Digite sua senha"
            className="form-control login-field"
            component={renderField}
          />
        </FormGroup>
        {error && !resendSuccess && (
          <Alert
            color="danger"
            onClick={() => handleResend(error, formValues.values)}
            style={error.includes('confirmado') ? { cursor: 'pointer' } : {}}
          >
            {resendError || error}
          </Alert>
        )}
        {resendSuccess && (
          <Alert color="success">
          Enviamos um novo email de confirmação. Por favor, verifique sua caixa de entrada.
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

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Insira seu email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ' email sem formato correto';
  }

  if (!values.password) {
    errors.password = ' Insira sua senha';
  }
  return errors;
};

const mapStateToProps = state => ({
  modal: state.login.modal,
  formValues: state.form.login,
  resendError: state.register.error,
  resendSuccess: state.register.success,
});

const mapDispatchToProps = dispatch => ({
/*  toggleModal: (modal) => {
    dispatch(resetState());
    dispatch(toggleModal(modal));
  }, */
  resendEmail: (email, password) => dispatch(resendEmail(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
  validate,
})(LoginForm));
