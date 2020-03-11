import { connect } from 'react-redux';
import DocumentList from 'components/document/DocumentList';
import {
  switchActiveDocument, deleteDocument, fetchPreviewDocument, copyDocument,
} from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  previewDocument: state.document.previewDocument,
});

/*
plans_quantity e questions_quantity
*/
const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idDocument, name, document) => ({
    modalProps: {
      open: true,
      title: 'Apagar prova',
      message: 'Você tem certeza que deseja apagar a prova',
      name,
      id: idDocument,
      resources: [
        {
          quantity: document.questions_quantity,
          message: `A prova possui ${document.questions_quantity} questões (s)`,
        },
        {
          quantity: document.plans_quantity,
          message: `A prova está sendo usada por ${document.plans_quantity} plano(s) de aula`,
        },
      ].filter(r => (r.quantity > 0)),
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
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'document',
  });

  return ({
    hideModal: () => dispatch(hideModal),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
    deleteDocument: idDocument => dispatch(deleteDocument(idDocument)),
    copyDocument: doc => dispatch(copyDocument(doc)),

    showDeleteModal: (idDocument, name, document) => dispatch(showModal(deleteModalProps(idDocument, name, document))),
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
