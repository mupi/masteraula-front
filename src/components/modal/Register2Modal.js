import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from 'components/userregister/RegisterForm';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fetchRegister } from 'actions/registerAction';

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

const mapDispatchToProps = dispatch => ({
  submit: (values) => {
    if (!values.acceptTerms) {
      throw new SubmissionError({
        _error: 'Você deve concordar com os Termos de Uso para usar o MasterAula ',
      });
    }

    return dispatch(fetchRegister(values.email, values.password, values.name, values.acceptTerms));
  },
});


export default connect(
  null,
  mapDispatchToProps,
)(Register2Modal);
