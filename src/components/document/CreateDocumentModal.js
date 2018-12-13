import React from 'react';
import {
  Modal, ModalHeader, ModalBody,
}
  from 'reactstrap';
import CreateDocumentForm from 'components/document/CreateDocumentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toogleSidebarAfterOpenModal = (e, openSidebar, isOpenSidebar) => {
  const responsiveMode = window.matchMedia('(max-width: 989px)');

  if (responsiveMode.matches) {
    e.preventDefault();
    openSidebar(isOpenSidebar);
  }
};


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
    modal, toggleModal, activeDocument, submit, openSidebar, isOpenSidebar,
  } = props;

  return (
    <div className="document__new-document-option">
      <div
        className="document__new-document-btn text-center"
        onClick={(e) => { toggleModal(modal); toogleSidebarAfterOpenModal(e, openSidebar, isOpenSidebar); }}
      >
        <FontAwesomeIcon
          className="btn__icon"
          icon="file"
        />
        Criar prova
      </div>
      <Modal isOpen={modal} toggle={() => toggleModal(modal)} className="document__new-document-modal-content">
        <ModalHeader className="document__new-document-modal-header" toggle={() => toggleModal(modal)}>
            Criar nova prova
        </ModalHeader>
        <ModalBody className="document__new-document-modal-body">
          <CreateDocumentForm onSubmit={submit} messageWhenDocumentExist={getAlertMessageDocumentExist(activeDocument)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateDocumentModal;
