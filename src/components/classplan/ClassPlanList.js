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
      {children}
    </td>
  );
};

const ClassPlanList = (props) => {
  const {
    showDeleteModal, classPlans,
  } = props;

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
                <th>Disciplinas</th>
                <th>Duração</th>
                <th>Data de criação</th>
                <th>Ver</th>
                <th>Editar</th>
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody align="center">
              {classPlans && classPlans.map(classPlan => (
                <tr key={classPlan.id}>
                  <OpenDocumentModalHeader>
                    {classPlan.name}
                  </OpenDocumentModalHeader>

                  <OpenDocumentModalHeader>
                    {classPlan.disciplines.map(t => t.name).join(', ')}
                  </OpenDocumentModalHeader>
                  <OpenDocumentModalHeader>
                    {classPlan.duration}
                  </OpenDocumentModalHeader>
                  <OpenDocumentModalHeader>
                    {formatDate(classPlan.create_date)}
                  </OpenDocumentModalHeader>
                  <td>
                    <Button
                      color="secondary"
                      title="Ver plano de aula"
                      to={`/view-classplan/${classPlan.id}`}
                      tag={Link}
                    >
                      <FontAwesomeIcon icon="eye" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="secondary"
                      title="Ver plano de aula"
                      to="/edit-classplan"
                      tag={Link}
                    >
                      <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                  </td>
                  <td>
                    <Button color="danger" onClick={() => handleDelete(classPlan.id, classPlan.name)} title="Apagar plano de aula">
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

export default ClassPlanList;
