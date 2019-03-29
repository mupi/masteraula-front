import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

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

const CreateDocumentWithQuestionForm = (props) => {
  const {
    handleSubmit, error, closeModal, initialValues,
  } = props;

  return (
    <div>
      <p className="text-center p--without-mbottom">
        Selecione a prova onde vai adicionar a questão N°
        {' '}
        {initialValues.idQuestion}
      </p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            component={renderField}
            type="text"
            name="name"
            id="name"
            label="Digite o nome da prova"
          />
        </FormGroup>
        <FormGroup check>
          {error && (
          <Alert color="danger">
            {error}
          </Alert>
          )}
        </FormGroup>
        <div className="document__new-document-modal-footer modal-footer">
          <Button type="submit" color="" className="btn--confirm">
            Criar
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

const mapStateToProps = state => ({
  modal: state.document.modal,
  initialValues: {
    idQuestion: state.document.willAddQuestion,
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Por favor, digite um nome para a nova prova';
  } else {
    const trueName = values.name.trim();
    if (trueName.length < 3) {
      errors.name = 'Seu nome precisa ter no mínimo 3 caracteres';
    }
  }

  return errors;
};

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'create_document_withquestion',
  validate,
})(CreateDocumentWithQuestionForm));
