import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
}
  from 'reactstrap';
import CreateDocumentForm from 'components/document/CreateDocumentForm';

const getAlertMessageDocumentExist = (activeDocument) => {
  if (activeDocument) {
    return (
      <p className="text-center">
        Atualmente você está editando o documento{' '}
        <strong>
          {activeDocument.name}
        </strong>
        <br />
        Você tem certeza que deseja criar um novo documento? Se sim, insira um nome para ele
        <br />
      </p>
    );
  }
  return '';
};

const CreateDocumentModal = (props) => {
  const {
    modal, toggleModal, activeDocument, submit, willAddQuestion,
  } = props;

  return (
    <div className="document__new-document-option">
      <div className="document__new-document-btn" onClick={() => toggleModal(modal)}>
        <i className="fa fa-file btn__icon" />
          Novo documento
      </div>
      <Modal isOpen={modal} toggle={() => toggleModal(modal)} className="document__new-document-modal-content">
        <ModalHeader className="document__new-document-modal-header" toggle={() => toggleModal(modal)}>
            Criar novo documento
        </ModalHeader>
        <ModalBody>
          <CreateDocumentForm onSubmit={submit} messageWhenDocumentExist={getAlertMessageDocumentExist(activeDocument)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateDocumentModal;
