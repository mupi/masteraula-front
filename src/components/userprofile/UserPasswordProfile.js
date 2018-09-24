import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Input, Label, UncontrolledAlert, Container, Row, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={placeholder}
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

const UserPasswordProfile = (props) => {
  const { handleSubmit, user, submitSucceeded } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="section-user-title">
          <h4>
            Minha Conta
          </h4>
        </Row>
        <Row>
          <Col sm="4" xs="12">
            Email
          </Col>
          <Col sm="4" xs="12" className="text-center">
            <Label>
              {user.email}
            </Label>
          </Col>
        </Row>
        <Row className="sub-section-user-title">
          <h5>
            Trocar senha
          </h5>
        </Row>
        <Row>
          <Col sm="4" xs="12">
            <FormGroup>
              <Field
                component={renderField}
                type="password"
                name="old_password"
                id="old_password"
                placeholder="Senha Atual"
                className="form-group"
              />
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Field
                component={renderField}
                type="password"
                name="new_password"
                id="new_password"
                placeholder="Nova senha"
                className="form-group"
              />
            </FormGroup>
          </Col>
          <Col sm="4">
            <FormGroup>
              <Field
                component={renderField}
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                placeholder="Confirme nova senha"
                className="form-control form-group"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="c-user-profile__button-section">
          <Col className="text-center">
            <Button type="submit">
              Redefinir senha
            </Button>
          </Col>
        </Row>
        <div>
          { submitSucceeded && (
            <UncontrolledAlert color="success">

                    Senha alterada com sucesso
            </UncontrolledAlert>
          ) }
        </div>
      </Container>
    </Form>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.new_password && !values.password_confirmation && !values.old_password) {
    errors.new_password = ' Campo obrigatório';
    errors.password_confirmation = ' Campo obrigatório';
    errors.old_password = ' Campo obrigatório';
  }

  if (values.new_password) {
    if (values.new_password.length < 8) {
      errors.new_password = 'A nova senha deve conter no mínimo 8 caracteres';
    } else if (!Number.isNaN(Number(values.new_password))) {
      errors.new_password = 'A nova senha não deve conter apenas números';
    }
  }

  if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation) {
    errors.password_confirmation = 'Senha e confirmação não coincidem';
  }

  return errors;
};


const mapStateToProps = (state) => {
  const { user } = state.session.session;
  return ({
    user,
  });
};

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'profile_password',
  validate,
})(UserPasswordProfile));
