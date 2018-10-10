import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Container, Row, Col,
} from 'reactstrap';
import { Field } from 'redux-form';

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
  const { handleSubmit, user } = props;

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
        <div />
      </Container>
    </Form>
  );
};

export default UserPasswordProfile;
