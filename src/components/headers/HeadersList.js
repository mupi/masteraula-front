import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { formatDate } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const OpenDocumentModalHeader = (props) => {
  const { children } = props;

  return (
    <td role="gridcell" className="c-my-documents__cell">
      { children }
    </td>
  );
};

class HeadersList extends React.Component {
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
 
  render() {
    const documents = [
      {
        id: '1', name: 'cabeçalho 1', discipline: 'Matemática', institution: 'Pequeno Urso', professor: 'Paula Furtado' 
      },
      {
        id: '2', name: 'cabeçalho 2', discipline: 'Geografia', institution: 'Pequeno Urso', professor: 'Marcio Lopez' 
      },
    ];

    return (
      <Row className="l-my-documents-list">

        <Col xs="12">
          <div>
            <Table responsive hover>
              <thead align="center">
                <tr>
                  <th>
                    Nome do cabeçalho
                  </th>
                  <th>
                    Disciplina
                  </th>
                  <th>
                    Instituição
                  </th>
                  <th>
                    Professor
                  </th>
                  <th>
                    Editar
                  </th>
                  <th>
                    Remover
                  </th>
                </tr>
              </thead>
              <tbody align="center">
                {documents.map((document, i) => (
                  <tr key={document.id}>
                    <OpenDocumentModalHeader>
                      {document.name}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader>
                      {document.discipline}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader>
                      {document.institution}
                    </OpenDocumentModalHeader> 
                    <OpenDocumentModalHeader>
                      {document.professor}
                    </OpenDocumentModalHeader>
                    <td>
                      <Link to={`/edit-header/1`}>
                        <Button color="secondary"/* onClick={() => this.editDocument(document)}*/>
                          <FontAwesomeIcon
                            icon="pencil-alt"
                          />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button color="danger" /* onClick={() => this.handleDelete(document.id, document.name)}*/>
                        <FontAwesomeIcon
                          icon="trash"
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

export default HeadersList;
