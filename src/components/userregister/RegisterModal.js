import React from 'react';
import RegisterForm from 'components/userregister/RegisterForm';
import 'bootstrap/dist/css/bootstrap.css';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'assets/css/General.css';
import 'assets/css/Register.css';
import { Link } from 'react-router-dom'
import { NavItem } from "reactstrap";


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
      <NavItem>
        <Link to="/" onClick={this.toggle}>Cadastre-se</Link>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <div className="contenedor-register">
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody>
                <h4>Cadastre-se</h4>
                <RegisterForm />
            </ModalBody>
          </div>
        </Modal>
      </NavItem>
    );
  }
}

export default RegisterModal;
