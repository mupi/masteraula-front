import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from 'components/login/LoginForm';
import { fetchLogin, toggleModal } from 'actions/loginAction';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';
import 'assets/css/Login.css';

const LoginModal = (props) => {
  const { modal, toggleModal, submit } = props;

  return (
    <div className="position-login">
      <Link to="#" onClick={() => toggleModal(modal)}>
Login
      </Link>
      <Modal isOpen={modal} toggle={() => toggleModal(modal)}>
        <div className="contenedor-login">
          <ModalHeader toggle={() => toggleModal(modal)} />
          <ModalBody>
            <h4>
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
