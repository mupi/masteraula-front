import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import CreateDocumentForm from 'components/document/CreateDocumentForm';
import { toggleModal } from 'actions/documentAction';


const CreateDocumentModal = (props) => {
  const { modal, toggleModal } = props;

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
          <CreateDocumentForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateDocumentModal;
