import React from 'react';
import {
  Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { first5Elements } from 'helpers/document';

class CreateDocumentMenu extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openCreateDocumentModal = this.openCreateDocumentModal.bind(this);
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

  openCreateDocumentModal() {
    // open modal
    const {
      showModal, setQuestionIdToNewDocument,
    } = this.props;
    setQuestionIdToNewDocument();

    showModal({
      open: true,
      closeModal: this.closeModal,
    }, 'createDocument');
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
          <Button className="btn-margin-right menu-top__document-button" onClick={() => { this.openCreateDocumentModal(); }}>
            <FontAwesomeIcon
              className="btn__icon"
              icon="file"
            />
            Criar prova
          </Button>
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

export default CreateDocumentMenu;