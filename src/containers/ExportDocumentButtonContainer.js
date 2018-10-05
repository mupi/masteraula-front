import { connect } from 'react-redux';
import { downloadDocument } from 'actions/documentAction';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';


const mapStateToProps = state => ({
  isDownloadingDocument: state.document.isDownloadingDocument,
});

const mapDispatchToProps = dispatch => ({
  downloadDocument: (idDocument, documentName) => dispatch(downloadDocument(idDocument, documentName)),
});

const ExportDocumentButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDocumentButton);

export default ExportDocumentButtonContainer;
