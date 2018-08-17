import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const ConfirmModal = ({
  modal, toggleModal, confirmAction, title, message,
}) => (
  <div>
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
      <Button color="primary" onClick={confirmAction}>
        <i className="fa fa-check-circle btn__icon" />
        Continuar
      </Button>
    </ModalFooter>
  </div>
);

ConfirmModal.propTypes = {
  toggleModal: PropTypes.func,
  confirmAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  modal: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  toggleModal: f => f,
  confirmAction: f => f,
  title: '',
  message: '',
  modal: false,
};

export default ConfirmModal;
