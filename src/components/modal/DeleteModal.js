import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

 
const DeleteModal = ({
  closeModal, deleteAction, title, message, idDocument,
}) => {
  const handleConfirm = () => {
    deleteAction(idDocument);
    closeModal();
  };

  return (
    <div className="modal-content modal__content">
      <div className="modal-header modal__header">
        <h5
          className="modal-title"
        >
          {title}
        </h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
&times;
          </span>
        </button>
      </div>
      <div className="modal-basic-operation__body modal-body">
        <p>
          {message}
        </p>

        <div className="modal-footer modal__footer">
          <Button color="secondary" onClick={closeModal}>
            <i className="fa fa-sign-out-alt btn__icon" />
          Fechar
          </Button>
          <Button className="btn--confirm" onClick={() => handleConfirm()}>
            <i className="fa fa-check-circle btn__icon" />
          Apagar
          </Button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  closeModal: PropTypes.func,
  deleteAction: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

DeleteModal.defaultProps = {
  closeModal: f => f,
  deleteAction: f => f,
  title: '',
  message: '',
};

export default DeleteModal;
