import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from 'components/userregister/RegisterForm';

const Register2Modal = ({
  closeModal, submit,
}) => (
  <div className="modal-content modal__content c-register__modal-content">
    <div className="modal-header modal__header c-register__modal-header">

      <button type="button" className="close" aria-label="Close" onClick={closeModal}>
        <span aria-hidden="true">
            &times;
        </span>
      </button>
    </div>
    <div className="modal-basic-operation__body modal-body c-register__modal-body">
      <h4
        className="modal-title text-center"
      >
        Cadastre-se
      </h4>
      <RegisterForm onSubmit={submit} />
    </div>
  </div>
);

Register2Modal.propTypes = {
  closeModal: PropTypes.func,
};

Register2Modal.defaultProps = {
  closeModal: f => f,
};

export default Register2Modal;
