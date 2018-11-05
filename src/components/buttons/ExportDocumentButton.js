import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName, documentTotalQuestions, hideModal, showModal, styleCustomize, isLink = false,
}) => {
  const closeModal = () => {
    hideModal();
  };

  const handleExport = () => {
    // open modal
    showModal({
      open: true,
      closeModal,
      title: 'Exportar prova',
      message: `Não é possível exportar porque a prova "${documentName}" não tem questões`,
    }, 'alert');
  };

  const handleExportAnswer = () => {
    // open modal
    showModal({
      open: true,
      closeModal,
      downloadDocument,
      documentId,
      documentName,
      title: 'Exportar Gabarito',
    }, 'exportDocument');
  };

  const handleClick = () => {
    if (documentTotalQuestions > 0) {
      handleExportAnswer();
    } else {
      handleExport();
    }
  };

  return (
    !isLink
      ? (
        <Button color={color} onClick={handleClick} className={styleCustomize}>
          {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
          {text}
        </Button>) : (
          <div color={color} onClick={handleClick} className={styleCustomize}>
            {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
            {text}
          </div>)

  );
};
export default ExportDocumentButton;
