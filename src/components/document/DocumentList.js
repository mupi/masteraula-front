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
    <td role="gridcell" onClick={onClickHandler} style={{ cursor: 'pointer' }} className="col-5 c-my-documents__cell">
      { children }
    </td>
  );
};

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openDocumentModal = this.openDocumentModal.bind(this);
    this.editDocument = this.editDocument.bind(this);
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
      editDocument: this.editDocument,
    }, 'document');
  }


  editDocument(document) {
    const { switchActiveDocument } = this.props;
    switchActiveDocument(document);
    this.closeModal();
  }

  handleDelete(id, name) {
    const { deleteDocument, showModal } = this.props;
    // open modal
    showModal({
      open: true,
      closeModal: this.closeModal,
      title: 'Apagar prova',
      message: `Você tem certeza que deseja apagar a prova ${name}?`,
      idDocument: id,
      deleteAction: deleteDocument,
    }, 'delete');
  }

  copyDocument(doc) {
    const { copyDocument } = this.props;
    copyDocument(doc);
  }

  render() {
    const { documents } = this.props;
    return (
      <Row className="l-my-documents-list">
        <Col xs="12">
          <div>
            <Table responsive hover>
              <thead align="center">
                <tr>
                  <th>
                Nome
                  </th>
                  <th>
                  Data de criação
                  </th>
                  <th>
                  Nº de questões
                  </th>
                  <th>
                  Editar
                  </th>
                  <th>
                  Duplicar
                  </th>
                  <th>
                  Exportar
                  </th>
                  <th>
                  Apagar
                  </th>
                </tr>
              </thead>
              <tbody align="center">
                {documents.map(document => (
                  <tr key={document.id}>
                    <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                      {document.name}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                      { formatDate(document.create_date) }
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                      {document.questions.length}
                    </OpenDocumentModalHeader>
                    <td>
                      <Button color="secondary" onClick={() => this.editDocument(document)} title="Editar prova">
                        <FontAwesomeIcon
                          icon="pencil-alt"
                        />
                      </Button>
                    </td>
                    <td>
                      <Button color="secondary" title="Criar cópia da prova" onClick={() => this.copyDocument(document)}>
                        <FontAwesomeIcon
                          icon="copy"
                        />
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
                      <Button color="danger" onClick={() => this.handleDelete(document.id, document.name)} title="Excluir prova">
                        <FontAwesomeIcon
                          icon="trash-alt"
                        />
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
  }
}

export default DocumentList;
