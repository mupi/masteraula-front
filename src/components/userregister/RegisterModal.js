import React, { Component } from 'react';
import RegisterForm from 'components/userregister/RegisterForm';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'assets/css/General.css';


class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="zIndex">
        <Button color="danger" onClick={this.toggle}>Cadastre-se</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <div className="contenedor-register">
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody>
                <h4>Cadastre-se</h4>
                <RegisterForm />
            </ModalBody>
          </div>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
