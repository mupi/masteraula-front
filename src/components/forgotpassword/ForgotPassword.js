import React from 'react';
import { Alert, Row, Col, Button, Form, FormGroup, Input 
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

const ForgotPassword = (props) => {
  const { handleSubmit, success } = props;

  return (
    <div className="c-forgot-password">
      <h3>
        Redefinição de senha 
      </h3>
      <p>
        Informe abaixo o endereço de email que você cadastrou para receber a mensagem de redefinição de senha
      </p>
      <Row className="justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
            <FormGroup className="text-left">
              <Field
                component={renderField}
                type="email"
                name="email"
                id="email"
                label="Insira seu email"
                className="form-control"
              /> 
            </FormGroup>
            { success
              && (
              <Alert color="success">
                <p className="alert__message">
                  Caso este e-mail estiver cadastrado, enviamos um email com instruções para recuperar sua senha
                </p>
              </Alert>
              )
            }
            <Button>
              Enviar email
            </Button>
          </Form>
        </Col>
      </Row>
     
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Insira seu email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Informe um endereço de email válido.'
  }
  return errors;
};

export default reduxForm({
  form: 'forgot_password',
  validate,
})(ForgotPassword);
