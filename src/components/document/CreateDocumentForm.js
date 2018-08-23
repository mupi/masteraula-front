import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleModal, createDocument } from 'actions/documentAction';

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
      <span>
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
    handleSubmit, error, modal, toggleModal, messageWhenDocumentExist
  } = props;

  return(
    <div>
      {messageWhenDocumentExist}
      <p className="text-center">Por favor, insira um nome para o novo documento a ser criado</p>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Field
          component={renderField}
          type="text"
          name="name"
          id="name"
          placeholder="Digite o nome do documento"
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
        <Button type="submit" color="" className="btn--confirm">Criar</Button>{' '}
        <Button color="secondary" onClick={() => toggleModal(modal)}>Cancelar</Button>
      </div>
      
      </Form>
    </div>
    );
}

const mapStateToProps = state => ({
  modal: state.document.modal,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: (modal) => {
    dispatch(toggleModal(modal));
  }
});

const validate = (values) =>{
  const errors = {};
  if(!values.name){
    errors.name = 'Por favor, digite um nome para o novo documento';
  } else {
    let trueName = values.name.trim(); 
    if(trueName.length < 3){
      errors.name = 'Seu nome precisa ter no mínimo 3 caracteres válidos.'
    }
  }

  return errors;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create_document',
  validate,
})(CreateDocumentForm));
