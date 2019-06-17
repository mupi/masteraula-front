import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login2Form from 'components/login/Login2Form';
import { fetchLogin } from 'actions/loginAction';

const Login2Modal = ({
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
        Entrar no MasterAula
      </h4>
      <Login2Form onSubmit={submit} closeModal={closeModal} />
    </div>
  </div>
);

Login2Modal.propTypes = {
  closeModal: PropTypes.func,
};

Login2Modal.defaultProps = {
  closeModal: f => f,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  submit: (values) => {
    dispatch(fetchLogin(values.email, values.password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login2Modal);
