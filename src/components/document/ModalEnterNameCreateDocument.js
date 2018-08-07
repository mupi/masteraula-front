import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button,Form, FormGroup,  Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';



class ModalEnterNameCreateDocument extends React.Component {
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
      <div className="document__new-document-option">
        <div className="document__new-document-btn" onClick={this.toggle}>
          <i className="fa fa-file btn__icon" />
          Novo documento
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="document__new-document-modal-content">

          <ModalHeader className="document__new-document-modal-header" toggle={this.toggle}>Criar novo documento</ModalHeader>
          <ModalBody>
            <p className="text-center">Por favor, insira um nome para o novo documento a ser criado</p>
            <FormGroup>
              <Input
                component="input"
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="Digite o nome do documento"
                className="form-control"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="document__new-document-modal-footer">
            <Button color="" className="btn--confirm" onClick={this.toggle}>Criar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'new-document-modal',
})(ModalEnterNameCreateDocument));
