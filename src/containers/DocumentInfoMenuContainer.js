import { connect } from 'react-redux';
import DocumentInfoMenu from 'components/menu/DocumentInfoMenu';
import { showModal, hideModal } from 'actions/modalAction';

import {
  listMyDocuments, listMyLastDocuments, switchActiveDocument, fetchPreviewDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
  previewDocument: state.document.previewDocument,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = (dispatch) => {
  const documentModalProps = () => ({
    modalProps: {
      open: true,
    },
    modalType: 'document',
  });

  return ({
    listMyDocuments: (page, orderField, order) => dispatch(listMyDocuments(page, orderField, order)),
    listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
    switchActiveDocument: (doc, redirect) => dispatch(switchActiveDocument(doc, redirect)),
    fetchPreviewDocument: props => dispatch(fetchPreviewDocument(props)),

    hideModal: () => dispatch(hideModal()),
    showDocumentModal: (id) => {
      dispatch(fetchPreviewDocument(parseInt(id, 10)));
      dispatch((_dispatch, getState) => {
        _dispatch(showModal(documentModalProps(getState().document.previewDocument)));
      });
    },
  });
};

const DocumentInfoMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentInfoMenu);

export default DocumentInfoMenuContainer;
