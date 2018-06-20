import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { NavItem } from "reactstrap";

import LoginForm from 'components/login/LoginForm';
import { fetchLogin, toggleModal } from 'actions/loginAction';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';

const LoginModal = props => {

  const { modal, toggleModal, submit } = props

  return (
    <NavItem>
      <Link to="/" onClick={ () => toggleModal(modal) }>Login</Link>
      <Modal isOpen={ modal } toggle={ () => toggleModal(modal) }>
        <div className="contenedor-login">
          <ModalHeader toggle={ () => toggleModal(modal) }></ModalHeader>
          <ModalBody>
              <h4>Entrar no MasterAula</h4>
              <LoginForm onSubmit={ submit }/>
          </ModalBody>
        </div>
      </Modal>
    </NavItem>
  );
}

const mapStateToProps = state => ({
  modal : state.login.modal
})

const mapDispatchToProps = dispatch => ({
  toggleModal : modal => dispatch(toggleModal(modal)),
  submit : values => {
    return dispatch(fetchLogin(values.email, values.password))
  } 
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)
(LoginModal);
