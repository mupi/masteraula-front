import React from 'react';
import PropTypes from 'prop-types';

const ConfirmModal = ({
   closeModal, confirmAction, title, message,
}) => (
  <div className="modal__content modal-content">
    <div className="modal__header modal-header">
      <h5
        className="modal-title"
      >{title}</h5>
      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <p>{message}</p>
      <div className="modal__footer modal-footer">
        <button type="button" color="primary" className="btn--confirm btn btn-secondary" onClick={confirmAction}>
          Continuar
        </button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>
          Cancelar
        </button>
    </div>
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
