import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExportDocumentButton = ({
  documentId, color, text, documentName, documentTotalQuestions, styleCustomize, isLink = false,
  showAlertModal, showExportDocumentModalProps,
}) => {
  const handleClick = () => {
    if (documentTotalQuestions > 0) {
      showExportDocumentModalProps(documentId, documentName);
    } else {
      showAlertModal(documentName);
    }
  };

  return (
    !isLink
      ? (
        <Button color={color} onClick={handleClick} className={styleCustomize} title="Exportar prova">
          {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
          {text}
        </Button>
      ) : (
        <div color={color} onClick={handleClick} className={styleCustomize}>
          {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
          {text}
        </div>
      )

  );
};
export default ExportDocumentButton;
