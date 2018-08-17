import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
}
  from 'reactstrap';
import modalTypes from './components/modal';

const MODAL_TYPES = {
  alert: modalTypes.alertModal,
  confirm: modalTypes.confirmModal,
  delete: modalTypes.deleteModal,
  prompt: modalTypes.promptModal,
};

const mapStateToProps = state => ({
  ...state.modal,
});

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open,
      })
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  toggle() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }


  render() {
    const { modalIsOpen } = this.state;
    const { modalProps } = this.props;

    if (!modalProps.modalType) {
      return null;
    }
    const SpecifiedModal = MODAL_TYPES[modalProps.modalType];

    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          toggle={this.toogle}
          className="modal__content"
        >
          <SpecifiedModal
            toggle={this.toggle}
            {...modalProps}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ModalContainer)
