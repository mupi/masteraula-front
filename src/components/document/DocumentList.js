import React from 'react';
import {
  Row, Col, Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';
import { formatDate } from 'helpers/question';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OpenDocumentModalHeader = (props) => {
  const { document, openDocumentModal, children } = props;

  const onClickHandler = () => {
    openDocumentModal(document.id);
  };

  return (
    <td role="gridcell" onClick={onClickHandler} style={{ cursor: 'pointer' }} className="c-my-documents__cell">
      {children}
    </td>
  );
};

const DocumentList = (props) => {
  const {
    hideModal, switchActiveDocument, showDeleteModal, showDocumentModal,
    copyDocument, documents, previewDocument,
  } = props;

  const editDocument = (document) => {
    switchActiveDocument(document);
    hideModal();
  };

  const openDocumentModal = (id) => {
    showDocumentModal(previewDocument, id);
  };

  const handleDelete = (id, name) => {
    showDeleteModal(id, name);
  };

  return (
    <Row className="l-my-documents-list">
      <Col xs="12">
        <div className="c-my-documents">
          <Table responsive hover>
            <thead align="center">
              <tr>
                <th>Nome</th>
                <th>Data de criação</th>
                <th>Nº de questões</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody align="center">
              {documents.map(document => (
                <tr key={document.id}>
                  <OpenDocumentModalHeader openDocumentModal={openDocumentModal} document={document}>
                    {document.name}
                  </OpenDocumentModalHeader>
                  <OpenDocumentModalHeader openDocumentModal={openDocumentModal} document={document}>
                    {formatDate(document.create_date)}
                  </OpenDocumentModalHeader>
                  <OpenDocumentModalHeader openDocumentModal={openDocumentModal} document={document}>
                    {document.questions.length}
                  </OpenDocumentModalHeader>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle title="Mais ações" className="c-my-documents__toggle">
                        <FontAwesomeIcon icon="ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu className="label-item__dropdown-menu" right>
                        <DropdownItem onClick={() => editDocument(document)} title="Editar prova">
                          <FontAwesomeIcon icon="pencil-alt" />
                          {' '}
                          Editar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem onClick={() => copyDocument(document)} title="Duplicar prova">
                          <FontAwesomeIcon icon="copy" />
                          {' '}
                          Duplicar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <ExportDocumentButtonContainer
                          documentId={document.id}
                          documentName={document.name}
                          documentTotalQuestions={document.questions.length}
                          isLink
                          text="Exportar"
                        />
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem className="c-my-documents__btn-remove" onClick={() => handleDelete(document.id, document.name)} title="Apagar prova">
                          <FontAwesomeIcon icon="trash-alt" />
                          {' '}
                          Apagar
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {documents && documents.length <= 0 && <div className="text-center">Não tem provas</div>}
        </div>
      </Col>
    </Row>
  );
};

export default DocumentList;
