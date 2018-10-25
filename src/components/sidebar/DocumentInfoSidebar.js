import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';

const DocumentInfoSidebar = ({ documentName, documentTotalQuestions, documentId }) => (
  <div className="c-sidebar__document-info">
    <h6 className="c-sidebar__document-name-section">
      <small className="c-sidebar__document-message">você está editando: </small>
      <Link className="c_sidebar__document-link" to="/edit-document">
        {`${documentName} (${documentTotalQuestions})`}
      </Link>
    </h6>
    <div className="c-sidebar__document-l-buttons">
      <Link className="c-sidebar__document-btn-item" to="/edit-document">
        <Button className="btn-margin-right c-sidebar__document-button">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Button>
      </Link>
      <ExportDocumentButtonContainer
        text="Exportar"
        styleCustomize="c-sidebar__document-button"
        documentId={documentId}
        documentName={documentName}
        documentTotalQuestions={documentTotalQuestions}
      />
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
