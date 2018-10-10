import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName, documentTotalQuestions,
}) => {
  const handleClick = () => {
    if (documentTotalQuestions>0)
      downloadDocument(documentId, documentName);
    else console.log("DOCUMENTO VAZIO");
  };

  return (
    <Button color={color} onClick={handleClick}>
      <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
      {text}
    </Button>
  );
};
export default ExportDocumentButton;
