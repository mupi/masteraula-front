import React from 'react';
import { connect } from 'react-redux';
import {
  Alert, Button, Form, FormGroup, Input, Label, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import { userNameValidator, emailValidator } from 'helpers/validators';
import { registerFacebook, registerGoogle } from 'actions/registerAction';
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

const RegisterForm = (props) => {
  const {
    handleSubmit, error, submitSucceeded, responseFacebook, responseGoogle,
  } = props;

  return (
    <div className="row justify-content-center">
      <Col sm="12" xs="12">
        <Form onSubmit={handleSubmit}>
          <FormGroup>

            <Field
              component={renderField}
              type="text"
              name="name"
              id="name"
              label="Insira seu nome completo"
              validate={userNameValidator}
              isAutoFocus
            />
          </FormGroup>
          <FormGroup>
            <Field
              component={renderField}
              type="email"
              name="email"
              id="email"
              label="Insira seu email"
              validate={emailValidator}
            />
          </FormGroup>
          <FormGroup>
            <Field
              component={renderField}
              type="password"
              name="password"
              id="password"
              label="Insira sua senha"
            />
          </FormGroup>
          <FormGroup>
            <Field
              component={renderField}
              type="password"
              name="confirm_password"
              id="confirm_password"
              label="Confirme sua senha"
            />
          </FormGroup>
          <div className="text-center">
            <FormGroup check className="form-group">
              <Label check>
                <Field
                  name="acceptTerms"
                  id="acceptTerms"
                  type="checkbox"
                  component={acceptTerms => (
                    <div>
                      <input type={acceptTerms.type} {...acceptTerms.input} />
                      Eu concordo com os
                      {' '}
                      {' '}
                      <NavLink target="_blank" className="use-terms" to="/terms-use">
                        Termos de Uso
                      </NavLink>
                      {acceptTerms.meta.touched && acceptTerms.meta.error && (
                        <span>
                          <br />
                          {acceptTerms.meta.error}
                        </span>
                      )}
                    </div>
                  )}
                />
                {' '}
              </Label>
            </FormGroup>
            <FormGroup check>
              {error && (
                <Alert color="danger">
                  {error}
                </Alert>
              )}
              {submitSucceeded
                && (
                  <Alert color="success">
                    <p className="alert__message">
                      Enviamos um email com instruções para ativar seu cadastro
                    </p>
                  </Alert>
                )
              }
            </FormGroup>
            <FacebookLogin
              appId={facebookLoginId}
              fields="name,email,picture"
              callback={responseFacebook}
              onFailure={() => { }}
              icon="fa-facebook"
              size="small"
            />
            <GoogleLogin
              clientId={googleLoginId}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
            <Button>
              Enviar
            </Button>
          </div>
        </Form>
      </Col>

    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Insira um nome';
  }
  if (!values.email) {
    errors.email = 'Insira um email';
  }

  if (!values.password) {
    errors.password = 'Insira uma senha';
  } else if (values.password.length < 8) {
    errors.password = 'A senha deve conter no mínimo 8 caracteres';
  } else if (!isNaN(values.password)) {
    errors.password = 'A senha não deve conter apenas números';
  }

  if (!values.confirm_password) {
    errors.confirm_password = 'Insira uma confirmação de senha';
  }
  if (values.password && values.confirm_password && values.password !== values.confirm_password) {
    errors.confirm_password = 'Senha e confirmação não coincidem';
  }

  return errors;
};

const mapStateToProps = state => ({
  modal: state.register.modal,
});

const mapDispatchToProps = dispatch => ({
  responseGoogle: response => dispatch(registerGoogle(response)),
  responseFacebook: response => dispatch(registerFacebook(response)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'register',
  validate,
})(RegisterForm));
