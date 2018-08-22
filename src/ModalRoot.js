import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal';

import { default as modalTypes } from 'components/modal';

const MODAL_TYPES = {
  'alert': modalTypes.alertModal,
  'confirm': modalTypes.confirmModal,
  'delete': modalTypes.deleteModal,
  'prompt': modalTypes.promptModal,
  'document': modalTypes.documentModal,
}

const mapStateToProps = state => ({
  ...state.modal,
});

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    const SpecifiedModal = MODAL_TYPES[this.props.modalType]
    return (
      <div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          overlayClassName="modal fade show"
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-lg"
          closeTimeoutMS={350}
        >
          <SpecifiedModal
            closeModal={this.closeModal}
            {...this.props.modalProps}
          />
        </ReactModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(ModalContainer)
