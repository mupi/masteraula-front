import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import OpenLastDocumentListContainer from 'containers/OpenLastDocumentListContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { first5Elements } from 'helpers/document';

class DocumentInfoMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openDocumentModal = this.openDocumentModal.bind(this);
    this.editDocument = this.editDocument.bind(this);
    this.editDocumentFromPreview = this.editDocumentFromPreview.bind(this);
  }

  componentDidMount() {
    const {
      listMyLastDocuments,
    } = this.props;
    listMyLastDocuments(1, 'date', 'desc');
  }

  editDocument(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document, false);
  }

  closeModal() {
    const { hideModal } = this.props;
    hideModal();
  }

  openDocumentModal(id) {
    // event.preventDefault();
    const {
      showModal, fetchPreviewDocument, previewDocument,
    } = this.props;

    fetchPreviewDocument(parseInt(id, 10));
    showModal({
      open: true,
      document: previewDocument,
      closeModal: this.closeModal,
      editDocument: this.editDocumentFromPreview,
    }, 'document');
  }

  editDocumentFromPreview(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document, true);
    this.closeModal();
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
                <DropdownItem className="o-doc-options__dropdown-item" onClick={() => this.openDocumentModal(documentId)}>
                  <FontAwesomeIcon icon="eye" />
                  {' '}
                  Visualizar
                </DropdownItem>
                <DropdownItem divider />
                <ExportDocumentButtonContainer
                  text="Exportar"
                  isLink
                  styleCustomize="o-doc-options__dropdown-item o-doc-options__export-button"
                  documentId={documentId}
                  documentName={documentName}
                  documentTotalQuestions={documentTotalQuestions}
                />
                <DropdownItem divider />
                <OpenLastDocumentListContainer
                  styleCustomize="o-doc-options__dropdown-item o-doc-options__export-button"
                  myLastDocumentsList={myLastDocumentsList}
                />
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

        </div>
        <div className="menu-top__document-l-buttons hidden-xs">
          <p className="menu-top__document-questions  btn__icon">
            <small className="menu-top__document-message">
              Q
              <span className="masteraula-nav-header__icon-option">uestões</span>
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
          <Button className="btn-margin-right menu-top__document-button" onClick={() => this.openDocumentModal(documentId)}>
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

              {myLastDocumentsList && first5Elements(myLastDocumentsList.results).map(document => (
                <DropdownItem
                  key={document.id}
                  className="menu-top__dropdown-item"
                  onClick={() => this.editDocument(document)}
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
