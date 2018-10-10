import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { history } from 'helpers/history';
import { formatDate } from 'helpers/question';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';


const OpenDocumentModalHeader = (props) => {
  const { document, openDocumentModal, children } = props;

  const onClickHandler = () => {
    openDocumentModal(document.id);
  };

  return (
    <td role="gridcell" onClick={onClickHandler} style={{ cursor: 'pointer' }}>
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
    history.push('/edit-document');
    this.closeModal();
  }

  handleDelete(id, name) {
    const { deleteDocument, showModal } = this.props;
    // open modal
    showModal({
      open: true,
      closeModal: this.closeModal,
      title: 'Apagar documento',
      message: `Você tem certeza que deseja apagar o documento ${name}?`,
      idDocument: id,
      deleteAction: deleteDocument,
    }, 'delete');
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
                  Exportar
                  </th>
                  <th>
                  Apagar
                  </th>
                </tr>
              </thead>
              <tbody align="center">
                {documents.map((document, i) => (
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
                      <ExportDocumentButtonContainer documentId={document.id} documentName={document.name} documentTotalQuestions={document.questions.length} />
                    </td>
                    <td>
                      <Button color="danger" onClick={() => this.handleDelete(document.id, document.name)}>
                        <i className="fa fa-trash" />
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
