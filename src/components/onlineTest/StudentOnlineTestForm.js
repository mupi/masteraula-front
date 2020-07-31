import React from 'react';
import {
  Form, Row, Col, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Field, reduxForm,
} from 'redux-form';
import { userNameValidator, requiredValidator } from 'helpers/validators';

// Basic Input Field
const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="text-left">
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
      className="form-control"
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
const StudentOnlineTestForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Nome completo</Label>
            <Field
              component={renderField}
              type="text"
              name="student_name"
              id="student_name"
              placeholder="Insira seu nome completo"
              className="form-control"
              validate={[requiredValidator, userNameValidator]}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="grade">Série</Label>
            <Field
              component={renderField}
              type="text"
              name="student_levels"
              id="student_levels"
              placeholder="Insira sua série/turma"
              className="form-control"
              validate={[requiredValidator]}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="text-center">
          <Button color="success" type="submit">
            {'Começar '}
            <FontAwesomeIcon icon="arrow-circle-right" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'student-test', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StudentOnlineTestForm);

// export default StudentOnlineTestForm;
