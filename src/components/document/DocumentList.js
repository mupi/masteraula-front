import React from 'react';
import {
  Row, Col, Table, Button,
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
        <div>
          <Table responsive hover>
            <thead align="center">
              <tr>
                <th>Nome</th>
                <th>Data de criação</th>
                <th>Nº de questões</th>
                <th>Editar</th>
                <th>Duplicar</th>
                <th>Exportar</th>
                <th>Apagar</th>
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
                    <Button color="secondary" onClick={() => editDocument(document)} title="Editar prova">
                      <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                  </td>
                  <td>
                    <Button color="secondary" title="Criar cópia da prova" onClick={() => copyDocument(document)}>
                      <FontAwesomeIcon icon="copy" />
                    </Button>
                  </td>
                  <td>
                    <ExportDocumentButtonContainer
                      documentId={document.id}
                      documentName={document.name}
                      documentTotalQuestions={document.questions.length}
                    />
                  </td>
                  <td>
                    <Button color="danger" onClick={() => handleDelete(document.id, document.name)} title="Excluir prova">
                      <FontAwesomeIcon icon="trash-alt" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};

export default DocumentList;
