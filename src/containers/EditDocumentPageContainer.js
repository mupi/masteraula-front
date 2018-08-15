import EditDocumentPage from 'pages/EditDocument/EditDocumentPage';
import { updateDocument, resetNewDocument } from 'actions/documentAction';
import { connect } from 'react-redux';

// Pass the newDocument from Redux's global state ("state")
// to preesentational container
const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
  updateDocument: props => dispatch(updateDocument(props)),
  resetNewDocument: () => dispatch(resetNewDocument()),
});

const EditDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDocumentPage);

export default EditDocumentPageContainer;
