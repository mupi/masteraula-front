import { connect } from 'react-redux';
import MyHeadersPage from 'pages/MyHeaders/MyHeadersPage';

import { showModal, hideModal } from 'actions/modalAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetchingMyDocuments: state.document.isFetchingMyDocuments,
  myDocumentsList: state.document.myDocumentsList,
  currentPage: state.document.currentPage,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  previewDocument: state.document.previewDocument,
  isFetchingPreviewDocument: state.document.isFetchingPreviewDocument,
  error: state.document.error,
  isDeleted: state.document.isDeleted,
  orderField: state.document.orderField,
  order: state.document.order,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
}); 

const MyHeadersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyHeadersPage);

export default MyHeadersPageContainer;
