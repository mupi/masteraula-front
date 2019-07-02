import React from 'react';
import {
  Alert, Button, Form, FormGroup, Col, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { resendEmail } from 'actions/registerAction';
import { loginFacebook, loginGoogle } from 'actions/loginAction';
import { facebookLoginId, googleLoginId } from 'helpers/config';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  isAutoFocus = false,
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
      autoFocus={isAutoFocus}
    />
    {touched
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

const Login2Form = (props) => {
  const {
    handleSubmit, error, handleResendEmail, formValues,
    resendError, resendSuccess, isSending, closeModal,
    responseFacebook, responseGoogle,
  } = props;

  function handleResend(message, values) {
    if (message.includes('confirmado')) {
      handleResendEmail(values.email, values.password);
    }
  }

  return (
    <Col sm="12" xs="12">
      <FacebookLogin
        appId={facebookLoginId}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
        size="small"
        textButton="Entrar com Facebook"
      />
      <GoogleLogin
        clientId={googleLoginId}
        buttonText="Entrar com Google"
        onSuccess={responseGoogle}
          // onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        className="google-login"
      />
      <hr className="hr5" />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            name="email"
            id="exampleEmail"
            label="Digite seu email"
            className="form-control login-field"
            component={renderField}
            onFailure={() => { }}
            isAutoFocus
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
        {error && !resendSuccess && !isSending && (
          <Alert
            color="danger"
            onClick={() => handleResend(error, formValues.values)}
            style={error.includes('confirmado') ? { cursor: 'pointer' } : {}}
          >
            {resendError || error}
          </Alert>
        )}
        {isSending && (
          <Alert color="warning">
            Enviando...
          </Alert>
        )}
        {resendSuccess && (
          <Alert color="success">
            Enviamos um novo email de confirmação. Por favor, verifique sua caixa de entrada.
          </Alert>
        )}
        <div className="text-center">
          <FormGroup>
            <NavLink to="/esqueci-senha" onClick={() => closeModal()}>

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
    errors.email = 'Email inválido';
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
  loginError: state.login.error,
  resendSuccess: state.register.success,
  isSending: state.register.isSending,
});

const mapDispatchToProps = dispatch => ({
  /*  toggleModal: (modal) => {
      dispatch(resetState());
      dispatch(toggleModal(modal));
    }, */
  responseGoogle: response => dispatch(loginGoogle(response)),
  responseFacebook: response => dispatch(loginFacebook(response)),
  handleResendEmail: (email, password) => dispatch(resendEmail(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'login',
  validate,
})(Login2Form));
