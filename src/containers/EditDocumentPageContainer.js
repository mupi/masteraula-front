import EditDocumentPage from 'pages/EditDocument/EditDocumentPage';
import {
  updateDocument, resetNewDocument, removeSelectedQuestion, fetchDocument, listMyLastDocuments,
} from 'actions/documentAction';
import { connect } from 'react-redux';
// Pass the newDocument from Redux's global state ("state")
// to presentational container
const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
  isUpdated: state.document.isUpdated,
  error: state.document.error,
  isRemoved: state.document.isRemoved,
  isFetchingRemoveQuestion: state.document.isFetchingRemoveQuestion,
  idRemovedQuestion: state.document.idRemovedQuestion,

});

const mapDispatchToProps = dispatch => ({
  submit: props => dispatch(updateDocument(props)),
  resetNewDocument: () => dispatch(resetNewDocument()),
  fetchDocument: props => dispatch(fetchDocument(props)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),

});

const EditDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDocumentPage);

export default EditDocumentPageContainer;
