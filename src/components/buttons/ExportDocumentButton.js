import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({ documentId, color, text }) => (  
  <Button color={color}>
    <i className={text ? 'fa fa-download btn__icon' : 'fa fa-download'} />
    {text}
  </Button>
);

export default ExportDocumentButton;
