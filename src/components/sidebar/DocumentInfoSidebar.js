import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ExportDocumentButton from 'components/buttons/ExportDocumentButton';

const DocumentInfoSidebar = ({ docName="Prova de Matemáticas", docNumberQuestions=0}) => (
  <div className="c-sidebar__document-info">
    <h5>
      Documento Atual
    </h5>
    <h6>
      <i className="fa fa-file btn__icon" />
      <a href="/" className="c_sidebar__document-link">
        {docName}
        (
        {docNumberQuestions}
        )
      </a>
    </h6>
    <div className="c_sidebar__document-buttons">
      <Button className="c_sidebar__button-item btn-margin-right">
        <Link to="/edit-document">
        <i className="fa fa-pencil btn__icon" />
          Editar
        </Link>
      </Button>



      <ExportDocumentButton />
    </div>
  </div>

);
export default DocumentInfoSidebar;
