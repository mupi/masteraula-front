import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const ExportDocumentButton = ({ documentId, color }) => (
  <Button color={color}>
    <i className="fa fa-download btn__icon" />
      Exportar
  </Button>
);

export default ExportDocumentButton;
