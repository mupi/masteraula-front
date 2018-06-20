import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, NavItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom'
import { connect} from 'react-redux'

import RegisterForm from 'components/userregister/RegisterForm';
import { fetchRegister, toggleModal } from 'actions/registerAction';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/General.css';

const RegisterModal = props => {
  
  const { modal, toggleModal, submit } = props

  return (
    <NavItem>
      <Link to="/" onClick={ () => toggleModal(modal) }>Cadastre-se</Link>
      <Modal isOpen={ modal } toggle={ () =>  toggleModal(modal) }>
        <div className="contenedor-register">
          <ModalHeader toggle={ () =>  toggleModal(modal) }></ModalHeader>
          <ModalBody>
              <h4>Cadastre-se</h4>
              <RegisterForm onSubmit={ submit }/>
          </ModalBody>
        </div>
      </Modal>
    </NavItem>
  );
}

const mapStateToProps = state => ({
  modal : state.register.modal
})

const mapDispatchToProps = dispatch => ({
  toggleModal : modal => dispatch(toggleModal(modal)),
  submit : values => {
    console.log(values)
     return dispatch(fetchRegister(values.email, values.password, values.name))
  } 
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(RegisterModal);
