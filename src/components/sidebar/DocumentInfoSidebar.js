import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, DropdownToggle, UncontrolledDropdown, DropdownItem, DropdownMenu,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';

const DocumentInfoSidebar = ({ documentName, documentTotalQuestions }) => (
  <div className="c-sidebar__document-info">
    <h5>
      Prova Atual
    </h5>
    <h6>
      <i className="fa fa-file btn__icon" />
      <Link className="c_sidebar__document-link" to="/edit-document">
        {`${documentName}`}
      </Link>
      <div style={{ marginLeft: '70px', marginTop: '10px' }}>
        {`${documentTotalQuestions} questões`}
      </div>
    </h6>
    <div className="c-sidebar__document-l-buttons">
      <Link className="c-sidebar__document-btn-item" to="/edit-document">
        <Button sm style={{ display: 'inline-block' }} color="success">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Button>
      </Link>
      <UncontrolledDropdown style={{ display: 'inline-block', marginLeft: '5px' }}>
        <DropdownToggle caret color="success">
          <i className="fa fa-refresh btn__icon" />
          Trocar prova
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
          Prova 1
          </DropdownItem>
          <DropdownItem>
          Prova 2
          </DropdownItem>
          <DropdownItem>
          Prova 3
          </DropdownItem>
           <DropdownItem>
          Prova 3
          </DropdownItem>
           <DropdownItem>
          Prova 3
          </DropdownItem>
           <DropdownItem divider />
           <DropdownItem>
          Ver mais 
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {/* <ExportDocumentButtonContainer
        text="Download"
        documentId={documentId}
        documentName={documentName}
        documentTotalQuestions={documentTotalQuestions}
      /> */}
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
