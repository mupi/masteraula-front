import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleModal, createDocument } from 'actions/documentAction';

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
          component="input"
          type="text"
          name="name"
          id="documentName"
          placeholder="Digite o nome do documento"
          className="form-control"
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
        <Button type="submit" color="" className="btn--confirm" onClick={() => toggleModal(modal)}>Criar</Button>{' '}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create_document',
})(CreateDocumentForm));
