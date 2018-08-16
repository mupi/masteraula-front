import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const DeleteModal = ({
  modal, toggleModal, deleteAction, title, message,
}) => (
  <Modal isOpen={modal} toggle={() => toggleModal(modal)} className="modal__content">
    <ModalHeader className="modal__header" toggle={() => toggleModal(modal)}>
      {title}
    </ModalHeader>
    <ModalBody>
      <p>
        {message}
      </p>
    </ModalBody>
    <ModalFooter className="modal__footer">
      <Button color="danger" onClick={() => toggleModal(modal)}>
        <i className="fa fa-sign-out-alt btn__icon" />
        Fechar
      </Button>
      <Button color="primary" onClick={deleteAction}>
        <i className="fa fa-check-circle btn__icon" />
        Continuar
      </Button>
    </ModalFooter>
  </Modal>
);

DeleteModal.propTypes = {
  toggleModal: PropTypes.func,
  deleteAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  modal: PropTypes.bool,
};

DeleteModal.defaultProps = {
  toggleModal: f => f,
  deleteAction: f => f,
  title: '',
  message: '',
  modal: false,
};

export default DeleteModal;
