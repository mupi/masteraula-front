import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text, downloadDocument, documentName,
}) => {
  const handleClick = () => {
    downloadDocument(documentId, documentName);
  };

  return (
    <Button color={color} onClick={handleClick}>
      <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
      {text}
    </Button>
  );
};
export default ExportDocumentButton;
