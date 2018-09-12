import { connect } from 'react-redux';
import ViewDocumentPage from 'pages/ViewDocument/ViewDocumentPage';
import {
  listMyDocuments, switchActiveDocument, fetchPreviewDocument, deleteDocument,
} from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetching: state.document.isFetching,
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
  listMyDocuments: (page, orderField, order) => dispatch(listMyDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
  fetchPreviewDocument: props => dispatch(fetchPreviewDocument(props)),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
});

const ViewDocumentPagePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocumentPage);

export default ViewDocumentPagePageContainer;
