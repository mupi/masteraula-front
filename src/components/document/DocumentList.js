import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { history } from 'helpers/history';

const OpenDocumentModalHeader = (props) => {
  const { document, openDocumentModal, children } = props;

  const onClickHandler = () => {
    openDocumentModal(document.id);
  };

  return (
    <td onClick={onClickHandler} style={{ cursor: 'pointer' }}>
      { children }
    </td>
  );
}

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
    const { showModal, fetchPreviewDocument, previewDocument, isFetchingPreviewDocument } = this.props;

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
    console.log(document);
    switchActiveDocument(document);
    history.push('/edit-document');
    this.closeModal();
  }

  render() {
    const { documents } = this.props;
    return (
      <Row className="l-my-documents-list">
      <Col xs="12">
      <div>
        
        <Table responsive hover striped>
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
                  Apagar
              </th>
            </tr>
          </thead>
          <tbody align="center">
            {documents.map((document, i) => (
              <tr key={i}>
                <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                  {document.name}
                </OpenDocumentModalHeader>
                <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                  {document.create_date}
                </OpenDocumentModalHeader>
                <OpenDocumentModalHeader openDocumentModal={this.openDocumentModal} document={document}>
                  {document.questions.length}
                </OpenDocumentModalHeader>
                <td>
                  <Button color="danger">
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
