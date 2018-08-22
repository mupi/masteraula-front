import { connect } from 'react-redux';
import ViewDocumentPage from 'pages/ViewDocument/ViewDocumentPage';
import { listMyDocuments, switchActiveDocument, fetchPreviewDocument } from 'actions/documentAction';
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
});

const mapDispatchToProps = dispatch => ({
  listMyDocuments: page => dispatch(listMyDocuments(page)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),  
  fetchPreviewDocument: props => dispatch(fetchPreviewDocument(props)),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const ViewDocumentPagePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocumentPage);

export default ViewDocumentPagePageContainer;
