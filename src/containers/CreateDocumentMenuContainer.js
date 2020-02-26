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
  myLastDocumentsList: state.document.myLastDocumentsList && state.document.myLastDocumentsList.results
    ? state.document.myLastDocumentsList.results.slice(0, 5) : null,
});

const mapDispatchToProps = (dispatch) => {
  const createDocumentModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createDocument',
  };

  return ({
    listMyDocuments: (page, orderField, order) => dispatch(listMyDocuments(page, orderField, order)),
    listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, false)),
    // new way to handle modals

    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
    setQuestionIdToNewDocument: () => dispatch(setQuestionIdToNewDocument()),
  });
};

const CreateDocumentMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentMenu);

export default CreateDocumentMenuContainer;
