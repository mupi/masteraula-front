import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName, documentTotalQuestions, hideModal, showModal,
}) => {
  const handleClick = () => {
    if (documentTotalQuestions>0)
      // downloadDocument(documentId, documentName);
       handleExportAnswer();
    else{
      //open modal
      handleExport();
    }
  };

  const closeModal = ( ) => {
    hideModal();
  }

  const handleExport = (name) => {
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
      message: `Você gostaria de exportar o gabarito da prova "${documentName}"?`,
    }, 'exportDocument');
  };

  return (
    <Button color={color} onClick={handleClick}>
      <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
      {text}
    </Button>
  );
};
export default ExportDocumentButton;
