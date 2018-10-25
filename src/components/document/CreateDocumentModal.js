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

const CreateDocumentModal = (props) => {
  const {
    modal, toggleModal, activeDocument, submit,
  } = props;

  return (
    <div className="document__new-document-option">
      <div className="document__new-document-btn text-center" onClick={() => toggleModal(modal)}>
        <i class="fa fa-file btn__icon"/>Criar prova
      </div>
      <Modal isOpen={modal} toggle={() => toggleModal(modal)} className="document__new-document-modal-content">
        <ModalHeader className="document__new-document-modal-header" toggle={() => toggleModal(modal)}>
            Criar nova prova
        </ModalHeader>
        <ModalBody>
          <CreateDocumentForm onSubmit={submit} messageWhenDocumentExist={getAlertMessageDocumentExist(activeDocument)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateDocumentModal;
