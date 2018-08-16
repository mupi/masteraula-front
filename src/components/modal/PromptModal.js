import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
}
  from 'reactstrap';

const PromptModal = ({
  modal, toggleModal, confirmAction, title, fields, onInputChange
}) => (
  <Modal isOpen={modal} toggle={() => toggleModal(modal)} className="modal__content">
    <ModalHeader className="modal__header" toggle={() => toggleModal(modal)}>
      {title}
    </ModalHeader>
    <ModalBody>
      <form>
        {fields.map((field, index) => (
          <div className="form-group" key={field.label}>
            <span htmlFor="address">
              {`${field.label}`}
            </span>
            <input
              id={index}
              name={field.name}
              type="text"
              className="form-control"
              placeholder={`${field.placeholder}`}
              onChange={onInputChange}
            />
          </div>
        ))}
      </form>
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
  </Modal>
);

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
