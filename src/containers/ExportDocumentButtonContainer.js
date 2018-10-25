import { connect } from 'react-redux';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import { downloadDocument } from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';


const mapStateToProps = state => ({
  isDownloadingDocument: state.document.isDownloadingDocument,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  downloadDocument: (idDocument,answer) => dispatch(downloadDocument(idDocument, answer)),
});

const ExportDocumentButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDocumentButton);

export default ExportDocumentButtonContainer;
