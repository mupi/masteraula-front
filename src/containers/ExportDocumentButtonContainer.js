import { connect } from 'react-redux';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';
import { showModal, hideModal } from 'actions/modalAction';
import { maxDocxFreePlan } from 'helpers/config';

const mapStateToProps = state => ({
  isDownloadingDocument: state.document.isDownloadingDocument,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,
  isPremium: state.session.session && state.session.session.user ? state.session.session.user.subscription : null,
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


  const alertModalPropsFreePlan = () => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
      title: 'Exportar prova',
      message: `Você atingiu seu limite máximo de ${maxDocxFreePlan} downloads (*.docx) por mês. Atualize seu plano gratuito para Premium`,
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
    showAlertModalFreePlan: () => dispatch(showModal(alertModalPropsFreePlan())),
    showExportDocumentModalProps: (documentId, documentName) => dispatch(showModal(exportDocumentModalProps(documentId, documentName))),
  };
};

const ExportDocumentButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportDocumentButton);

export default ExportDocumentButtonContainer;
