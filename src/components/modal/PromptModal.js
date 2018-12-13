import React from 'react';
import PropTypes from 'prop-types';

import {
  Button
}
  from 'reactstrap';

const PromptModal = ({ closeModal, confirmAction, title, fields, onInputChange }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5
          className="modal-title"
        >{title}</h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          {
            fields.map(field => {
              return (
                <div className="form-group" key={field.label}>
                  <label htmlFor="address">{`${field.label}`}</label>
                  <input
                    id="address"
                    name={field.name}
                    type="text"
                    className="form-control"
                    placeholder={`${field.placeholder}`}
                    onChange={onInputChange}
                  />
                </div>
              )
            })
          }
        </form>
      </div>
      <div className="modal-footer">
        <Button color="danger" onClick={closeModal}>
        Cancelar
        </Button>
        <Button color="primary" onClick={confirmAction}>
          Continuar
        </Button>
      </div>
    </div>
  )
}

PromptModal.propTypes = {
  toggleModal: PropTypes.func,
  confirmAction: PropTypes.func,
  title: PropTypes.string,
  modal: PropTypes.bool,
};

PromptModal.defaultProps = {
  toggleModal: f => f,
  confirmAction: f => f,
  title: '',
  modal: false,
};

export default PromptModal;
