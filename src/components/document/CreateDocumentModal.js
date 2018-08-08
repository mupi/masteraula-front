import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Modal, ModalHeader, ModalBody,
}
  from 'reactstrap';
import { reduxForm } from 'redux-form';
import CreateDocumentForm from 'components/document/CreateDocumentForm';


class CreateDocumentModal extends Component {
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
          <ModalHeader className="document__new-document-modal-header" toggle={this.toggle}>
            Criar novo documento
          </ModalHeader>
          <ModalBody>
            <CreateDocumentForm/>
          </ModalBody>
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
})(CreateDocumentModal));
