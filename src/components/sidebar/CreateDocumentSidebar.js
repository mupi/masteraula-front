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

class CreateDocumentSidebar extends React.Component {
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
    switchActiveDocument(document);
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
    switchActiveDocument(document);
    this.closeModal();
  }

  render() {
    const {
      myLastDocumentsList,
    } = this.props;

    return (
      <div className="menu-top__document-info">
        <div className="menu-top__document-name-section">
          <small className="menu-top__document-message">
            Você ainda não está editando uma prova
          </small>
        </div>
        <div className="menu-top__document-l-buttons">
          <Link className="menu-top__document-btn-item" to="/edit-document">
            <Button className="btn-margin-right menu-top__document-button">
              <FontAwesomeIcon
                className="btn__icon"
                icon="file"
              />
              Criar prova
            </Button>
          </Link>
          <UncontrolledDropdown className="">
            <DropdownToggle className="menu-top__document-button" caret size="sm">
              <FontAwesomeIcon icon="sync-alt" className="btn__icon" />
              Provas recentes
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

CreateDocumentSidebar.propTypes = {
  documentName: PropTypes.string,
  documentTotalQuestions: PropTypes.number,
};

CreateDocumentSidebar.defaultProps = {
  documentName: 'Sem nome',
  documentTotalQuestions: 0,
};

export default CreateDocumentSidebar;
