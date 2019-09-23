import { connect } from 'react-redux';
import CreateDocumentMenu from 'components/menu/CreateDocumentMenu';
import { showModal, hideModal } from 'actions/modalAction';

import {
  setQuestionIdToNewDocument, listMyDocuments, listMyLastDocuments, switchActiveDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
  isFetchingPreviewDocument: state.document.isFetchingPreviewDocument,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = dispatch => ({
  listMyDocuments: (page, orderField, order) => dispatch(listMyDocuments(page, orderField, order)),
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc, false)),
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  setQuestionIdToNewDocument: () => dispatch(setQuestionIdToNewDocument()),

});

const CreateDocumentMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentMenu);

export default CreateDocumentMenuContainer;
