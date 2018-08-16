import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const AlertModal = ({
  modal, toggleModal, title, message,
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
    </ModalFooter>
  </Modal>
);

AlertModal.propTypes = {
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  modal: PropTypes.bool,
};

AlertModal.defaultProps = {
  toggleModal: f => f,
  title: '',
  message: '',
  modal: false,
};

export default AlertModal;
