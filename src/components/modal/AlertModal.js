import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';


const AlertModal = ({
  closeModal, title, message,
}) => {

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
          Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

AlertModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default AlertModal;
