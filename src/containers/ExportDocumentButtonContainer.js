import { connect } from 'react-redux';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  isDownloadingDocument: state.document.isDownloadingDocument,
});

const mapDispatchToProps = (dispatch) => {
  const alertModalProps = documentName => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
      title: 'Exportar prova',
      message: `Não é possível exportar porque a prova "${documentName}" não tem questões`,
    },
    modalType: 'alert',
  });

  const exportDocumentModalProps = (documentId, documentName) => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
      title: 'Exportar prova',
      documentId,
      documentName,
    },
    modalType: 'exportDocument',
  });

  return {
    showAlertModal: documentName => dispatch(showModal(alertModalProps(documentName))),
    showExportDocumentModalProps: (documentId, documentName) => dispatch(showModal(exportDocumentModalProps(documentId, documentName))),
  };
};

const ExportDocumentButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDocumentButton);

export default ExportDocumentButtonContainer;
