import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ExportDocumentButton from 'components/buttons/ExportDocumentButton';

const DocumentInfoSidebar = ({ documentName="Sem nome", documentTotalQuestions=0}) => (
  <div className="c-sidebar__document-info">
    <h5>
      Documento Atual
    </h5>
    <h6>
      <i className="fa fa-file btn__icon" />
      <a href="/" className="c_sidebar__document-link">
        {documentName} {' '}
        (
        {documentTotalQuestions}
        )
      </a>
    </h6>
    <div className="c-sidebar__document-l-buttons">
      <Button className="btn-margin-right">
        <Link className="c-sidebar__document-btn-item" to="/edit-document">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Link>
      </Button>
      <ExportDocumentButton />
    </div>
  </div>

);
export default DocumentInfoSidebar;
