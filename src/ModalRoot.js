import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import modalTypes from 'components/modal';

const MODAL_TYPES = {
  alert: modalTypes.alertModal,
  confirm: modalTypes.confirmModal,
  delete: modalTypes.deleteModal,
  prompt: modalTypes.promptModal,
  document: modalTypes.documentModal,
  exportDocument: modalTypes.exportDocumentModal,

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
      });
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalType, modalProps } = this.props;
    const { modalIsOpen } = this.state;
    let modalClassName = 'modal-dialog';
    if (!modalType) {
      return null;
    }

    if (modalType === 'document') modalClassName = 'modal-dialog modal-lg';

    const SpecifiedModal = MODAL_TYPES[modalType];

    return (
      <div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          ariaHideApp={false}
          overlayClassName="modal fade show"
          bodyOpenClassName="modal-open"
          className={modalClassName}
          closeTimeoutMS={350}
        >
          <SpecifiedModal
            closeModal={this.closeModal}
            {...modalProps}
          />
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ModalContainer);
