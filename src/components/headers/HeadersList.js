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
    this.editDocument = this.editDocument.bind(this);
  }

  closeModal() {
    const { hideModal } = this.props;
    hideModal();
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
    const { headers } = this.props;
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
                {headers && headers.map((header, i) => (
                  <tr key={header.id}>
                    <OpenDocumentModalHeader>
                      {header.name}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader>
                      {header.discipline_name}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader>
                      {header.institution_name}
                    </OpenDocumentModalHeader>
                    <OpenDocumentModalHeader>
                      {header.professor_name}
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
