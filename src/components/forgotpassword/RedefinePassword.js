import React from 'react';
import {
  Button, Form, FormGroup, Alert, Row, Col, Input,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

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

const validate = (values) => {
  const errors = {};

  if (!values.newpassword) {
    errors.newpassword = 'Insira uma senha';
  } else if (values.newpassword.length < 8) {
    errors.newpassword = 'A senha deve conter no mínimo 8 caracteres';
  } else if (!isNaN(values.newpassword)) {
    errors.newpassword = 'A senha não deve conter apenas números';
  }

  if (!values.repeatpassword) {
    errors.repeatpassword = 'Insira uma confirmação de senha';
  }
  if (values.newpassword && values.repeatpassword && values.newpassword !== values.repeatpassword) {
    errors.repeatpassword = 'Senha e confirmação não coincidem';
  }

  return errors;
};


const RedefinePassword = (props) => {
  const { handleSubmit, error, submitSucceeded } = props;

  return (
    <div className="c-redefine-password">
      <h3>
        <i className="fa fa-lock" />
        {' '}
Mudar sua senha
      </h3>
      <Row className="justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
            <FormGroup className="text-left">
              <Field
                component={renderField}
                type="password"
                name="newpassword"
                id="newpassword"
                label="Nova senha"
                className="form-control"
              />
            </FormGroup>
            <FormGroup className="text-left">
              <Field
                component={renderField}
                type="password"
                name="repeatpassword"
                id="repeatpassword"
                label="Nova senha (novamente)"
                className="form-control"
              />
            </FormGroup>
            {error && (
            <Alert color="danger">
              {error}. Solicite uma nova redefinição de senha <a href="/#/esqueci-senha">aqui</a>
            </Alert>
            )}
            { submitSucceeded
              && (
              <Alert color="success">
                <p className="alert__message">
                  Sua senha foi alterada com sucesso
                </p>
              </Alert>
              )
            }
            <Button>
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};


export default reduxForm({
  form: 'redefine_password',
  validate,
})(RedefinePassword);
