// ModalRoot.js
import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import modalTypes from 'components/modal';
import { hideModal } from 'actions/modalAction';

const MODAL_TYPES = {
  alert: modalTypes.alertModal,
  confirm: modalTypes.confirmModal,
  basicConfirm: modalTypes.basicConfirmModal,
  delete: modalTypes.deleteModal,
  prompt: modalTypes.promptModal,
  document: modalTypes.documentModal,
  question: modalTypes.questionModal,
  activity: modalTypes.activityModal,
  onlineTest: modalTypes.onlineTestModal,
  exportDocument: modalTypes.exportDocumentModal,
  last5Documents: modalTypes.last5DocumentsModal,
  register2: modalTypes.register2Modal,
  login2: modalTypes.login2Modal,
  createDocument: modalTypes.createDocument,
  createMyQuestionLabelModal: modalTypes.createMyQuestionLabelModal,
  createClassPlanModal: modalTypes.createClassPlanModal,
  createObjectModal: modalTypes.createObjectModal,
  searchDocumentModal: modalTypes.searchDocumentModal,
  searchObjectModal: modalTypes.searchObjectModal,
  searchActivityModal: modalTypes.searchActivityModal,
  searchQuestionModal: modalTypes.searchQuestionModal,
  searchOnlineTestModal: modalTypes.searchOnlineTestModal,
  studentResults: modalTypes.OnlineTestStudentResultsModal,
};

const mapStateToProps = state => ({
  ...state.modal,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

const ModalContainer = (props) => {
  const { modalType, modalProps, closeModal } = props;

  let modalClassName = 'modal-dialog';
  if (!modalType) {
    return null;
  }

  if (modalType === 'onlineTest' || modalType === 'document' || modalType === 'question' || modalType === 'activity' || modalType === 'studentResults'
  || modalType === 'createObjectModal') modalClassName = 'modal-dialog modal-lg';

  if ((modalType === 'searchActivityModal') || (modalType === 'searchObjectModal') || (modalType === 'searchDocumentModal')
    || (modalType === 'searchQuestionModal') || (modalType === 'searchOnlineTestModal')) {
    modalClassName = 'modal-dialog modal-xl modal-fixed';
  }

  const SpecifiedModal = MODAL_TYPES[modalType];

  return (
    <div>
      <ReactModal
        isOpen={modalProps.open}
        onRequestClose={closeModal}
        contentLabel="Modal"
        ariaHideApp={false}
        overlayClassName="modal fade show"
        bodyOpenClassName="modal-open"
        className={modalClassName}
        closeTimeoutMS={350}
      >
        <SpecifiedModal
          {...modalProps}
        />
      </ReactModal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
