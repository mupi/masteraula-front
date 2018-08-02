import CreateDocumentPage from 'pages/CreateDocument/CreateDocumentPage';
import { createDocument, resetNewDocument } from 'actions/documentAction';
import { connect } from 'react-redux';

// Pass the newDocument from Redux's global state ("state")
// to preesentational container
const mapStateToProps = state => ({
  newDocument: state.document.newDocument,
});

const mapDispatchToProps = dispatch => ({
  createDocument: props => dispatch(createDocument(props)),
  resetNewDocument: () => dispatch(resetNewDocument()),
});

const CreateDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentPage);

export default CreateDocumentPageContainer;
