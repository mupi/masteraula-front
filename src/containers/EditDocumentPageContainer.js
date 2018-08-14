import EditDocumentPage from 'pages/EditDocument/EditDocumentPage';
import { updateDocument, resetNewDocument, removeSelectedQuestion } from 'actions/documentAction';
import { connect } from 'react-redux';
// Pass the newDocument from Redux's global state ("state")
// to presentational container
const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
  updateDocument: props => dispatch(updateDocument(props)),
  resetNewDocument: () => dispatch(resetNewDocument()),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),

});

const EditDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDocumentPage);

export default EditDocumentPageContainer;
