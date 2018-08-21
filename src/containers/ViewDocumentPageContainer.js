import { connect } from 'react-redux';
import ViewDocumentPage from 'pages/ViewDocument/ViewDocumentPage';
import { listMyDocuments, switchActiveDocument } from 'actions/documentAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetching: state.document.isFetching,
  myDocumentsList: state.document.myDocumentsList,
  currentPage: state.document.currentPage,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  error: state.document.error,
});

const mapDispatchToProps = dispatch => ({
  listMyDocuments: page => dispatch(listMyDocuments(page)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
});

const ViewDocumentPagePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocumentPage);

export default ViewDocumentPagePageContainer;
