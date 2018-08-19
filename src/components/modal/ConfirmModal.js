import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const ConfirmModal = ({
   closeModal, confirmAction, title, message,
}) => (
  <div className="modal__content">
    <div className="modal__header">
      <h5
        className="modal-title"
      >{title}</h5>
      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{message}</p>
    </div>
    <div className="modal__footer">
      <button type="button" className="btn btn-secondary" onClick={closeModal}><i className="fa fa-sign-out-alt btn__icon" />
      Fechar</button>
      <button color="primary" onClick={confirmAction}>
        <i className="fa fa-check-circle btn__icon" />
        Continuar
      </button>
    </div>
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
