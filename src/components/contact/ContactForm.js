import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { normalizePhoneBr } from 'helpers/normalizers';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import { userNameValidator, requiredValidator, emailValidator } from 'helpers/validators';

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
  autoFocus = false,
}) => (
  <div>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
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


const ContactForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Nome completo</Label>
        <Field
          component={renderField}
          type="text"
          name="name"
          id="name"
          placeholder="Insira seu nome completo"
          className="form-control"
          validate={[requiredValidator, userNameValidator]}
        />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Field
              component={renderField}
              name="email"
              id="email"
              label="Insira seu email"
              placeholder="Insira email"
              validate={[requiredValidator, emailValidator]}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="phone">Telefone</Label>
            <Field
              name="phone"
              component="input"
              type="text"
              placeholder="Insira seu telefone"
              className="form-control"
              normalize={normalizePhoneBr}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="message">Mensagem</Label>
        <Field
          component={renderField}
          type="textarea"
          name="message"
          id="message"
          placeholder="Insira sua mensagem"
          className="form-control"
          validate={requiredValidator}
        />
      </FormGroup>
      <div className="text-center">
        <Button type="submit" disabled={submitting}>
            Enviar
        </Button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'contact-form',
})(ContactForm);
