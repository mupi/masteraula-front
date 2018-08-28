import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from 'components/login/LoginForm';
import { fetchLogin, toggleModal } from 'actions/loginAction';


const LoginModal = (props) => {
  const { modal, toggleModal, submit } = props;

  return (
    <div className="l-login">
      <Link to="#" onClick={() => toggleModal(modal)}>
        Entrar
      </Link>
      <Modal className="c-login" isOpen={modal} toggle={() => toggleModal(modal)}>
        <div className="c-login__modal-content">
          <ModalHeader className="c-login__modal-header" toggle={() => toggleModal(modal)} />
          <ModalBody>
            <h4 className="text-center">
              Entrar no MasterAula
            </h4>
            <LoginForm onSubmit={submit} />
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  modal: state.login.modal,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  submit: values => dispatch(fetchLogin(values.email, values.password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal);
