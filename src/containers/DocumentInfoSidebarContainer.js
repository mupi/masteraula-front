import { connect } from 'react-redux';
import DocumentInfoSidebar from 'components/sidebar/DocumentInfoSidebar';

import {
  listMyLastDocuments, switchActiveDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
});

const DocumentInfoSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentInfoSidebar);

export default DocumentInfoSidebarContainer;
