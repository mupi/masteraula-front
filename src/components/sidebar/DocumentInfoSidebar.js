import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';

const DocumentInfoSidebar = ({ documentName, documentTotalQuestions, documentId }) => (
  <div className="c-sidebar__document-info">
    <h5>
      Documento Atual
    </h5>
    <h6>
      <i className="fa fa-file btn__icon" />
      <Link className="c_sidebar__document-link" to="/edit-document">
        {`${documentName} (${documentTotalQuestions})`}
      </Link>
    </h6>
    <div className="c-sidebar__document-l-buttons">
      <Link className="c-sidebar__document-btn-item" to="/edit-document">
        <Button className="btn-margin-right">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Button>
      </Link>
      <ExportDocumentButtonContainer text="Exportar" documentId={documentId} documentName={documentName} />
    </div>
  </div>
);

DocumentInfoSidebar.propTypes = {
  documentName: PropTypes.string,
  documentTotalQuestions: PropTypes.number,
};

DocumentInfoSidebar.defaultProps = {
  documentName: 'Sem nome',
  documentTotalQuestions: 0,
};

export default DocumentInfoSidebar;
