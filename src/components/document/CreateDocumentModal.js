import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
}
  from 'reactstrap';

import CreateDocumentForm from 'components/document/CreateDocumentForm';

const CreateDocumentModal = (props) => {
  const { modal, toggleModal, submit } = props;

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
          <CreateDocumentForm onSubmit={submit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateDocumentModal;
