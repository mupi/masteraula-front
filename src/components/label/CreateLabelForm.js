import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form, Label, Row, Col,
} from 'reactstrap';
import {
  requiredValidator, maxLength50,
} from 'helpers/validators';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const labelColors = [
  { name: 'Amarelo', code: '#FFFF33' },
  { name: 'Roxo', code: '#A849F7' },
  { name: 'Vermelho', code: '#F9442E' },
  { name: 'Cinza', code: '#BABEBF' },
  { name: 'Preto', code: '#050505' },
  { name: 'Rosa', code: '#FC1979' },
  { name: 'Laranja', code: '#FC7320' },
  { name: 'Verde Claro', code: '#9AEE2E' },
  { name: 'Verde Escuro', code: '#569505' },
  { name: 'Azul', code: '#82C2FB' },
];

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
      autoFocus
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

const CreateLabelForm = (props) => {
  const {
    handleSubmit, error, closeModal, selectedColor, nameAction,
  } = props;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Nome</Label>
          <Field
            component={renderField}
            type="text"
            name="name"
            id="name"
            label="Nome da etiqueta"
            validate={[requiredValidator, maxLength50]}
          />
        </FormGroup>
        <Row form className="align-items-center">
          <Col md="12">
            <Label for="exampleEmail">Color</Label>
          </Col>
          <Col md={10} xs={10}>
            <FormGroup>
              <Field
                name="color"
                component="select"
                className="form-control"
              >
                <option value="#fff">Selecione uma cor </option>
                { labelColors.map(color => <option value={color.code}>{color.name}</option>)}
              </Field>
            </FormGroup>
          </Col>
          <Col md={2} xs={2} className="text-center">
            <FormGroup>
              {selectedColor && (
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  margin: 'auto',
                  backgroundColor: selectedColor,
                }}
              />
              )}


            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          {error && (
          <Alert color="danger">
            {error}
          </Alert>
          )}
        </FormGroup>
        <div className="document__new-document-modal-footer modal-footer">
          <Button type="submit" color="" className="btn--confirm">
            {nameAction}
          </Button>
          {' '}
          <Button color="secondary" onClick={() => closeModal()}>
            Cancelar
          </Button>
        </div>

      </Form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector('create_label');
  return ({
    initialValues: ownProps.data,
    selectedColor: selector(state, 'color') || '#fff',
  });
};

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'create_label',
})(CreateLabelForm));
