import React from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
}
  from 'reactstrap';

const ViewQuestionModal = (props) => {
  const { modal, toggleModal, activeDocument, selectedQuestion } = props;

  return (
    <Modal className="c-document__question-modal" isOpen={modal} toggle={() => toggleModal(modal)}  size="lg">
      <ModalHeader toggle={() => toggleModal(modal)} />

      <ModalBody>
        <p>Detalhe da questão</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => toggleModal(modal)}>
          Remover
        </Button>
        {' '}
        <Button color="danger" onClick={() => toggleModal(modal)}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewQuestionModal;
