import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
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
  }

  closeModal() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleDelete(id, name) {
    const { deleteHeader, showModal } = this.props;
    // open modal
    showModal({
      open: true,
      closeModal: this.closeModal,
      title: 'Apagar cabeçalho',
      message: 'Você tem certeza que deseja apagar o cabeçalho',
      name,
      idDocument: id,
      deleteAction: deleteHeader,
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
                      <Link to={`/edit-header/${header.id}`}>
                        <Button color="secondary">
                          <FontAwesomeIcon
                            icon="pencil-alt"
                          />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button color="danger" onClick={() => this.handleDelete(header.id, header.name)}>
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

export default HeadersList;
