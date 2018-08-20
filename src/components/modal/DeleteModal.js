import React from 'react';
import {Button}  from 'reactstrap';
import PropTypes from 'prop-types';


const DeleteModal = ({ closeModal, deleteAction, title, message, cancelText, deleteText }) => {
  return (
    <div className="modal-content modal__content">
      <div className="modal-header modal__header">
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
      <div className="modal-footer modal__footer">
      <Button color="danger" onClick={closeModal}>
        <i className="fa fa-sign-out-alt btn__icon" />
        Fechar
      </Button>
      <Button color="primary" onClick={deleteAction}>
        <i className="fa fa-check-circle btn__icon" />
        Continuar
      </Button>
      </div>
    </div>
  )
}

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
