import { connect } from 'react-redux';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,
  isPremium: state.session.session && state.session.session.user ? state.session.session.user.subscription : null,
});

const mapDispatchToProps = (dispatch) => {
  const alertModalProps = message => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
      title: 'Exportar prova',
      message,
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
    showAlertModal: message => dispatch(showModal(alertModalProps(message))),
    showExportDocumentModalProps: (documentId, documentName) => dispatch(showModal(exportDocumentModalProps(documentId, documentName))),
  };
};

const ExportDocumentButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDocumentButton);

export default ExportDocumentButtonContainer;
