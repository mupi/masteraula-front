import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleModal } from 'actions/documentAction';

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

const CreateDocumentForm = (props) => {
  const {
    handleSubmit, error, modal, messageWhenDocumentExist, initialValues,
  } = props;

  return (
    <div>
      {initialValues.idQuestion ? (
        <p className="text-center">
Você está adicionando uma questão a um documento sem nome.
        </p>
      ) : ''}
      {messageWhenDocumentExist || (
      <p className="text-center">
Por favor, insira um nome para o novo documento a ser criado
      </p>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Field
            component={renderField}
            type="text"
            name="name"
            id="name"
            label="Digite o nome do documento"
          />
        </FormGroup>
        <FormGroup>
          <Field
            component="input"
            type="text"
            name="idQuestion"
            id="idQuestion"
            label="Digite o nome do documento"
            style={{ display: 'none' }}
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
          <Button color="secondary" onClick={() => toggleModal(modal)}>
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

const mapDispatchToProps = dispatch => ({
  toggleModal: (modal) => {
    dispatch(toggleModal(modal));
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Por favor, digite um nome para o novo documento';
  } else {
    const trueName = values.name.trim();
    if (trueName.length < 3) {
      errors.name = 'Seu nome precisa ter no mínimo 3 caracteres válidos.';
    }
  }

  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create_document',
  validate,
})(CreateDocumentForm));
