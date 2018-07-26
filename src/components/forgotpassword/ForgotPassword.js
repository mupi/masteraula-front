import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';


const ForgotPassword = (props) => {
  const { handleSubmit, success } = props;

  return (
    <div className="c-forgot-password">
      <h3>
Redefinição de senha
      </h3>
      <p>

            Informe abaixo o endereço de email o qual a conta está registrada para receber uma mensagem para a redefinição de sua senha
      </p>
      <Row className="justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
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
            <Button>
Enviar email
            </Button>
          </Form>
        </Col>
      </Row>
      { success
          && (
          <Alert color="success">
            <p className="alert__message">
Enviamos um email com instruções para recuperar sua senha
            </p>
          </Alert>
          )
        }
    </div>
  );
};


export default reduxForm({
  form: 'forgot_password',
})(ForgotPassword);
