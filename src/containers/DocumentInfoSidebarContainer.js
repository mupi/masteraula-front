import { connect } from 'react-redux';
import DocumentInfoSidebar from 'components/sidebar/DocumentInfoSidebar';
import { showModal, hideModal } from 'actions/modalAction';

import {
  listMyLastDocuments, switchActiveDocument, fetchPreviewDocument
} from 'actions/documentAction';

const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,

  previewDocument: state.document.previewDocument,
  isFetchingPreviewDocument: state.document.isFetchingPreviewDocument,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList, 
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
  fetchPreviewDocument: props => dispatch(fetchPreviewDocument(props)),

  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType })); 
  },
});

const DocumentInfoSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentInfoSidebar);

export default DocumentInfoSidebarContainer;
