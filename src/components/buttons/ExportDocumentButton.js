import React from 'react';
import { apiUrl } from 'helpers/config';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({
  documentId, color, text,
}) => (
  <Button color={color} href={`${apiUrl}/documents/${documentId}/generate_list/`}>
    <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
    {text}
  </Button>
);
export default ExportDocumentButton;
