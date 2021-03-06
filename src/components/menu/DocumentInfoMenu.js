import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import OpenLastDocumentListContainer from 'containers/OpenLastDocumentListContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DocumentInfoMenu extends React.Component {
  componentDidMount() {
    const { listMyDocuments } = this.props;

    listMyDocuments(1, 'date', 'desc');
  }

  switchActiveDocument(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document, false);
  }

  showDocumentModal(id) {
    const { showDocumentModal } = this.props;
    showDocumentModal(id);
  }

  render() {
    const {
      myLastDocumentsList, documentName, documentTotalQuestions, documentId,
    } = this.props;

    return (
      <div className="menu-top__document-info">
        <div className="menu-top__document-name-section">
          <small className="menu-top__document-message hidden-xs">
          Você está editando:
            {' '}
          </small>

          <Link className="menu-top__document-link hidden-xs" to="/edit-document">
            {`${documentName}`}
            {' '}
          </Link>

          <div className="menu-top__document-link visible-xs">
            <UncontrolledDropdown className="o-doc-options">
              <DropdownToggle caret size="sm" className="o-doc-options__dropdown-toggle">
                {`${documentName}`}
                {' '}
                <span className="menu-top__xs-document-number-questions">
                  {` (${documentTotalQuestions})`}
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/edit-document" className="o-doc-options__dropdown-item">
                  <FontAwesomeIcon icon="pencil-alt" />
                  {' '}
                  Editar
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="o-doc-options__dropdown-item" onClick={() => this.showDocumentModal(documentId)}>
                  <FontAwesomeIcon icon="eye" />
                  {' '}
                  Visualizar
                </DropdownItem>
                <DropdownItem divider />
                <ExportDocumentButtonContainer
                  text="Exportar"
                  isLink
                  styleCustomize="o-doc-options__dropdown-item"
                  documentId={documentId}
                  documentName={documentName}
                  documentTotalQuestions={documentTotalQuestions}
                />
                <DropdownItem divider />
                <OpenLastDocumentListContainer
                  styleCustomize="o-doc-options__dropdown-item"
                  myLastDocumentsList={myLastDocumentsList}
                />
                <DropdownItem divider />
                <DropdownItem tag={Link} to={`/create-online/${documentId}`} className="o-doc-options__dropdown-item">
                  <FontAwesomeIcon icon="laptop" />
                  {' '}
                  Gerar prova online
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

        </div>
        <div className="menu-top__document-l-buttons hidden-xs">
          <p className="menu-top__document-questions  btn__icon">
            <small className="menu-top__document-message">
              Q
              <span>uestões</span>
              :
              {' '}
              <span className="menu-top__document-number-questions">
                <strong>
                  {documentTotalQuestions}
                </strong>
              </span>
            </small>
          </p>
          <Link className="menu-top__document-btn-item" to="/edit-document">
            <Button className="btn-margin-right menu-top__document-button">
              <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
              Editar
            </Button>
          </Link>
          <Button className="btn-margin-right menu-top__document-button" onClick={() => this.showDocumentModal(documentId)}>
            <FontAwesomeIcon icon="eye" className="btn__icon" />
            Visualizar
          </Button>
          <ExportDocumentButtonContainer
            text="Exportar"
            styleCustomize="menu-top__document-button"
            documentId={documentId}
            documentName={documentName}
            documentTotalQuestions={documentTotalQuestions}
          />
          <UncontrolledDropdown className="">
            <DropdownToggle className="menu-top__document-button" caret size="sm">
              <FontAwesomeIcon icon="sync-alt" className="btn__icon" />
              Trocar prova
            </DropdownToggle>
            <DropdownMenu>

              {myLastDocumentsList && myLastDocumentsList.map(document => (
                <DropdownItem
                  key={document.id}
                  className="menu-top__dropdown-item"
                  onClick={() => this.switchActiveDocument(document)}
                >
                  {document.name}
                </DropdownItem>
              ))}
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/documents/1" className="menu-top__dropdown-item">
                  Ver mais provas
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Link
            className="btn btn-secondary menu-top__document-button"
            to={`/create-online/${documentId}`}
          >
            <FontAwesomeIcon icon="laptop" />
            {' Gerar prova online'}
          </Link>
        </div>
      </div>
    );
  }
}

DocumentInfoMenu.propTypes = {
  documentName: PropTypes.string,
  documentTotalQuestions: PropTypes.number,
};

DocumentInfoMenu.defaultProps = {
  documentName: 'Sem nome',
  documentTotalQuestions: 0,
};

export default DocumentInfoMenu;
