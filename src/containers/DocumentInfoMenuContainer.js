import { connect } from 'react-redux';
import DocumentInfoMenu from 'components/menu/DocumentInfoMenu';
import { showModal, hideModal } from 'actions/modalAction';

import {
  listMyLastDocuments, switchActiveDocument, fetchPreviewDocument,
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
  switchActiveDocument: (doc, redirect) => dispatch(switchActiveDocument(doc, redirect)),
  fetchPreviewDocument: props => dispatch(fetchPreviewDocument(props)),

  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType })); 
  },
});

const DocumentInfoMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentInfoMenu);

export default DocumentInfoMenuContainer;
