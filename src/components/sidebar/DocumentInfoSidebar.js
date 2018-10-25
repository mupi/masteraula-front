import React from 'react';
import PropTypes from 'prop-types';
import { Button , UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { Link } from 'react-router-dom';

 import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';

const DocumentInfoSidebar = ({ documentName, documentTotalQuestions, documentId }) => (
  <div className="c-sidebar__document-info">
    <div className="c-sidebar__document-name-section">
      <small className="c-sidebar__document-message">Você está editando: </small>
      <Link className="c_sidebar__document-link" to="/edit-document">
        {`${documentName}`}  
      </Link>
    </div>
    <div className="c-sidebar__document-l-buttons">
    <a>
    <p className="c-sidebar__document-questions  btn__icon"><small className="c-sidebar__document-message">Questões: {documentTotalQuestions} </small></p>

      </a>
      <Link className="c-sidebar__document-btn-item" to="/edit-document">
        <Button className="btn-margin-right c-sidebar__document-button">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Button>
      </Link>
      <a>
      <ExportDocumentButtonContainer
        text="Exportar"
        styleCustomize="c-sidebar__document-button btn-margin-right"
        documentId={documentId}
        documentName={documentName}
        documentTotalQuestions={documentTotalQuestions}
      />
      </a>
      <a>
      <UncontrolledDropdown className="">
                      <DropdownToggle className="c-sidebar__document-button" caret size="sm">
                        Trocar prova
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          Prova 1
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Mais provas
                        </DropdownItem>
                      </DropdownMenu>
          </UncontrolledDropdown></a>
    
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
