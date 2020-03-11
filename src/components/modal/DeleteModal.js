import React from 'react';
import { Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const DeleteModal = ({
  closeModal, deleteAction, title, message, name, id, resources,
}) => {
  const handleConfirm = () => {
    deleteAction(id);
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
          {' '}
          <strong>{name}</strong>
          {' ?'}
        </p>
        {
          resources && (resources.map(r => <Alert color="danger" key={r.message}>{r.message}</Alert>))
        }

        <div className="modal-footer modal__footer">
          <Button className="btn--confirm" onClick={() => handleConfirm()}>
            Apagar
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cancelar
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
