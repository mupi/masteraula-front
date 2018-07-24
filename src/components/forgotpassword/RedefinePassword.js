import React from 'react';
import { Button, Form, FormGroup, Alert } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { resetForgotPasswordForm } from 'actions/forgotPasswordAction';

const RedefinePassword = props => {
  const { handleSubmit, error, submitSucceeded } = props

  return (
    <div className="c-redefine-password">
      <h3><i className="fa fa-lock"></i> Mudar sua senha</h3>
      <Row className="justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={ handleSubmit }>
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
            {error && <Alert color="danger">{error}</Alert>}
            { submitSucceeded  &&
              <Alert color="success">
                <p><i className="fa fa-thumbs-up"></i> Sua senha foi alterada com sucesso</p>
              </Alert>
            }
            <Button>Salvar</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}


export default reduxForm({
  form: 'redefine_password'
})(RedefinePassword)
