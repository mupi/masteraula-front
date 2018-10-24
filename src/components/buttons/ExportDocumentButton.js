import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName, documentTotalQuestions, hideModal, showModal,
}) => {
  const handleClick = () => {
    if (documentTotalQuestions>0)
      downloadDocument(documentId, documentName);
    else{
      //open modal
      handleExport(documentName);
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
      message: `Não é possível exportar porque a prova "${name}" não tem questões`,
    }, 'alert');
  };
 
  return (
    <Button color={color} onClick={handleClick}>
      <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
      {text}
    </Button>
  );
};
export default ExportDocumentButton;
