import EditDocumentPage from 'pages/EditDocument/EditDocumentPage';
import {
  updateDocument, resetNewDocument, removeSelectedQuestion, fetchDocument,
} from 'actions/documentAction';
import { connect } from 'react-redux';
// Pass the newDocument from Redux's global state ("state")
// to presentational container
const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
  isUpdated: state.document.isUpdated,
  error: state.document.error,
  isRemoved: state.document.isRemoved,
});

const mapDispatchToProps = dispatch => ({
  submit: props => dispatch(updateDocument(props)),
  resetNewDocument: () => dispatch(resetNewDocument()),
  fetchDocument: props => dispatch(fetchDocument(props)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
});

const EditDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDocumentPage);

export default EditDocumentPageContainer;
