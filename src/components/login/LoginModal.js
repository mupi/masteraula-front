import React from 'react';
import LoginForm from 'components/login/LoginForm';
import 'bootstrap/dist/css/bootstrap.css';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import 'assets/css/General.css';
import { Link } from 'react-router-dom'
import { NavItem } from "reactstrap";

class LoginModal extends React.Component {
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
        <Link to="/" onClick={this.toggle}>Login</Link>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <div className="contenedor-login">
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody>
                <h4>Entrar no MasterAula</h4>
                <LoginForm />
            </ModalBody>
          </div>
        </Modal>
      </NavItem>
    );
  }
}

export default LoginModal;
