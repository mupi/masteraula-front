import React from 'react';
import {
  Modal, ModalHeader, ModalBody, NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import RegisterForm from 'components/userregister/RegisterForm';
import { fetchRegister, toggleModal } from 'actions/registerAction';


const RegisterModal = (props) => {
  const { modal, toggleThisModal, submit } = props;

  return (
    <NavItem>
      <Link to="#top" onClick={() => toggleThisModal(modal)}>
Cadastre-se
      </Link>
      <Modal className="c-register" isOpen={modal} toggle={() => toggleThisModal(modal)}>
        <div className="c-register__modal-content">
          <ModalHeader className="c-register__modal-header" toggle={() => toggleThisModal(modal)} />
          <ModalBody>
            <h4 className="text-center">
Cadastre-se
            </h4>
            <RegisterForm onSubmit={submit} />
          </ModalBody>
        </div>
      </Modal>
    </NavItem>
  );
};

const mapStateToProps = state => ({
  modal: state.register.modal,
});

const mapDispatchToProps = dispatch => ({
  toggleThisModal: modal => dispatch(toggleModal(modal)),
  submit: (values) => {
    if (!values.accept_terms) {
      throw new SubmissionError({
        _error: 'Você deve concordar com os Termos de Uso para usar o MasterAula ',
      });
    }

    return dispatch(fetchRegister(values.email, values.password, values.name, values.accept_terms));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterModal);
