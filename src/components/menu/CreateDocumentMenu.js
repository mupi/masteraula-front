import React from 'react';
import {
  Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreateDocumentMenu extends React.PureComponent {
  componentDidMount() {
    const {
      listMyLastDocuments,
    } = this.props;
    listMyLastDocuments(1, 'date', 'desc');
  }

  openCreateDocumentModal = () => {
    // open modal
    const {
      showCreateDocumentModal, setQuestionIdToNewDocument,
    } = this.props;
    setQuestionIdToNewDocument();
    showCreateDocumentModal();
  }

  editDocument(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document);
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
          <Button className="btn-margin-right menu-top__document-button" onClick={this.openCreateDocumentModal}>
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

              {myLastDocumentsList && myLastDocumentsList.map(document => (
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
