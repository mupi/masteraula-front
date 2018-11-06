import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import OpenLastDocumentListContainer from 'containers/OpenLastDocumentListContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const first5Elements = (myLastDocumentsList) => {
  const myLast5DocumentsList = [];
  let count = 0;
  const countLimit = (myLastDocumentsList.length < 5 ? myLastDocumentsList.length : 5);

  while (count < countLimit) {
    myLast5DocumentsList.push(myLastDocumentsList[count]);
    count += 1;
  }
  return myLast5DocumentsList;
};


class DocumentInfoSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.editDocument = this.editDocument.bind(this);
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
                <DropdownItem className="o-doc-options__dropdown-item">
                  <Link to="/edit-document" className="c-sidebar__link-my-profile">
                    <FontAwesomeIcon icon="user" />
                    {' '}
                    Editar
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="o-doc-options__dropdown-item">
                  <ExportDocumentButtonContainer
                    text="Exportar"
                    isLink
                    styleCustomize="o-doc-options__export-button"
                    documentId={documentId}
                    documentName={documentName}
                    documentTotalQuestions={documentTotalQuestions}
                  />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="o-doc-options__dropdown-item">
                  <OpenLastDocumentListContainer myLastDocumentsList={myLastDocumentsList}/>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

        </div>
        <div className="menu-top__document-l-buttons hidden-xs">
          <p className="menu-top__document-questions  btn__icon">
            <small className="menu-top__document-message">
              Questões:
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
                </DropdownItem>))}
              <DropdownItem divider />
              <DropdownItem className="menu-top__dropdown-item">
                <Link to="/documents/1" className="menu-top__link-more-documents">
                  Ver mais provas
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
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
