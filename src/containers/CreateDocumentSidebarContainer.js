import { connect } from 'react-redux';
import CreateDocumentSidebar from 'components/sidebar/CreateDocumentSidebar';
import { showModal, hideModal } from 'actions/modalAction';

import {
  listMyLastDocuments, switchActiveDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,

  isFetchingPreviewDocument: state.document.isFetchingPreviewDocument,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc, false)),

  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType })); 
  },
});

const CreateDocumentSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentSidebar);

export default CreateDocumentSidebarContainer;
