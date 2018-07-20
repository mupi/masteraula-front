import React from 'react';
import {
  Button, Form, FormGroup, Alert,
} from 'reactstrap';
import { Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { resetForgotPasswordForm } from 'actions/forgotPasswordAction';

import 'bootstrap/dist/css/bootstrap.css';

const RedefinePassword = (props) => {
  const { handleSubmit, error, submitSucceeded } = props;

  return (
    <div className="contenedor-forgotpassword">
      <h3>
        <i className="fa fa-lock" />
        {' '}
Mudar sua senha
      </h3>
      <div className="row justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                component="input"
                type="password"
                name="newpassword"
                id="newpassword"
                placeholder="Nova senha"
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Field
                component="input"
                type="password"
                name="repeatpassword"
                id="repeatpassword"
                placeholder="Nova senha (novamente)"
                className="form-control"
              />
            </FormGroup>
            {error && (
            <Alert color="danger">
              {error}
            </Alert>
            )}
            { submitSucceeded
              && (
              <Alert color="success">
                <p>
                  <i className="fa fa-thumbs-up" />
                  {' '}
Sua senha foi alterada com sucesso
                </p>
              </Alert>
              )
            }
            <Button>
Salvar
            </Button>
          </Form>
        </Col>
      </div>
    </div>
  );
};


export default reduxForm({
  form: 'redefine_password',
})(RedefinePassword);
