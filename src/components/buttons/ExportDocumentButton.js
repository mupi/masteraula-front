import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName, documentTotalQuestions, closeModal, showModal,
}) => {
  const handleClick = () => {
    if (documentTotalQuestions>0)
      downloadDocument(documentId, documentName);
    else{
      //open modal
      console.log("nao exportar");
      handleExport(documentName);
    }
  };

  const handleExport = (name) => {
    // open modal
    showModal({
      open: true,
      closeModal,
      title: 'Exportar documento',
      message: `Não é possível exportar porque o documento "${name}"? não tem questões`,
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
