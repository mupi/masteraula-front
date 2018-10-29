import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';


class DocumentInfoSidebar extends React.Component {

  componentDidMount() {
    const {
      listMyLastDocuments,
    } = this.props;
    listMyLastDocuments(1, 'date', 'desc');
  }

  editDocument(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document);
  }


  render() {
    const {
      myLastDocumentsList, isFetchingMyLastDocuments, documentName, documentTotalQuestions, documentId, activeDocument,
    } = this.props;

    return ( 
      <div className="menu-top__document-info">
      <div className="menu-top__document-name-section">
        <small className="menu-top__document-message hidden-xs">Você está editando: </small>
        <Link className="menu-top__document-link" to="/edit-document">
          {`${documentName}`}
        </Link>
      </div>
    <div className="menu-top__document-l-buttons">
      <a>
        <p className="menu-top__document-questions  btn__icon">
          <small className="menu-top__document-message">
            Questões:
            {' '}<span className="menu-top__document-number-questions"><strong>{documentTotalQuestions}</strong></span>
          </small>
        </p>
      </a>
      <Link className="menu-top__document-btn-item" to="/edit-document">
        <Button className="btn-margin-right menu-top__document-button">
          <i className="fa fa-pencil btn__icon" />
          Editar
        </Button>
      </Link>
      <a>
        <ExportDocumentButtonContainer
          text="Exportar"
          styleCustomize="menu-top__document-button"
          documentId={documentId}
          documentName={documentName}
          documentTotalQuestions={documentTotalQuestions}
        />
      </a>
      <a>
        <UncontrolledDropdown className="">
          <DropdownToggle className="menu-top__document-button" caret size="sm">
          <i className="fa fa-refresh btn__icon"/>
          Trocar prova
          </DropdownToggle>
          <DropdownMenu>
          {activeDocument && false && myLastDocumentsList.results.map((document, i) => (
            <DropdownItem className="menu-top__dropdown-item"  onClick={() => this.editDocument(document)} >
              Prova de Matemáticas
            </DropdownItem>))}
            <DropdownItem className="menu-top__dropdown-item">
              Mais provas
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </a>
    </div>
  </div> 
    );
  }
}

DocumentInfoSidebar.propTypes = {
  documentName: PropTypes.string,
  documentTotalQuestions: PropTypes.number,
};

DocumentInfoSidebar.defaultProps = {
  documentName: 'Sem nome',
  documentTotalQuestions: 0,
};

export default DocumentInfoSidebar;
