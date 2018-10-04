import React from 'react';
import { apiUrl } from 'helpers/config';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text,
}) => (
  <Button color={color} href={`${apiUrl}/documents/${documentId}/generate_list/?answers=True`}>
    <i className={text ? 'fa fa-download o-button-export btn__icon' : 'o-button-export fa fa-download'} />
    {text}
  </Button>
);
export default ExportDocumentButton;
