import React from 'react';
import PropTypes from 'prop-types';
import CreateDocumentForm from 'components/document/CreateDocumentForm';
import CreateDocumentWithQuestionFormContainer from 'containers/CreateDocumentWithQuestionFormContainer';

import {
  createDocument,
} from 'actions/documentAction';
import { connect } from 'react-redux';

import { openSidebar } from 'actions/menuAction';
import { hideModal } from 'actions/modalAction';

const getAlertMessageDocumentExist = (activeDocument) => {
  if (activeDocument) {
    return (
      <p className="text-center">
        Atualmente você está editando a prova
        {' '}
        <strong>
          {activeDocument.name}
        </strong>
        <br />
        Você tem certeza que deseja criar uma nova prova? Se sim, insira um nome para ela
        <br />
      </p>
    );
  }
  return '';
};

const CreateDocumentModal = ({
  closeModal, submit, activeDocument, willAddQuestion, title = 'Criar nova prova',
}) => (
  <div className="modal-content modal__content">
    <div className="modal-header modal__header">
      <h5
        className="modal-title"
      >
        {title}
      </h5>
      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">
          &times;
        </span>
      </button>
    </div>
    <div className="modal-basic-operation__body modal-body">
      {!willAddQuestion ? (
        <CreateDocumentForm
          onSubmit={submit}
          activeDocument={activeDocument}
          messageWhenDocumentExist={getAlertMessageDocumentExist(activeDocument)}
          closeModal={closeModal}
        />
      ) : <CreateDocumentWithQuestionFormContainer closeModal={closeModal} />}
    </div>
  </div>
);


CreateDocumentModal.propTypes = {
  closeModal: PropTypes.func,
};

CreateDocumentModal.defaultProps = {
  closeModal: f => f,
};


const mapDispatchToProps = dispatch => ({
  submit: (values) => {
    dispatch(createDocument(values));
    dispatch(hideModal());
  },
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
});

const mapStateToProps = state => ({
  modal: state.document.modal,
  willAddQuestion: state.document.willAddQuestion,
  isOpenSidebar: state.menu.isOpenSidebar,
  activeDocument: state.document.activeDocument,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentModal);
