import { connect } from 'react-redux';
import DocumentList from 'components/document/DocumentList';
import {
  switchActiveDocument, deleteDocument, fetchPreviewDocument, copyDocument,
} from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  previewDocument: state.document.previewDocument,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idDocument, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar prova',
      message: 'Você tem certeza que deseja apagar a prova',
      name,
      idDocument,
      deleteAction: () => dispatch(deleteDocument(idDocument)),
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const documentModalProps = document => ({
    modalProps: {
      open: true,
      document,
      editDocument: () => {
        dispatch(switchActiveDocument(document));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'document',
  });

  return ({
    hideModal: () => dispatch(hideModal),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    copyDocument: doc => dispatch(copyDocument(doc)),

    showDeleteModal: (idDocument, name) => dispatch(showModal(deleteModalProps(idDocument, name))),
    showDocumentModal: (previewDocument, id) => {
      dispatch(fetchPreviewDocument(parseInt(id, 10)));
      dispatch(showModal(documentModalProps(previewDocument)));
    },
  });
};

const DocumentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentList);

export default DocumentListContainer;
