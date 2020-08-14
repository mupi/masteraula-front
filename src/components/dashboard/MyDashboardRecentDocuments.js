import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyDashboardRecentDocuments = (props) => {
  const {
    myLastDocumentsList,
    switchActiveDocument, showCreateDocumentModal, showCreateClassPlanModal,
    selectedClassPlanType,
  } = props;
  return (
    <Row>
      <Col sm="12">
        <h5>Minhas provas recentes</h5>
      </Col>
      <Col sm="8">
        <Table responsive hover className="c-my-dashboard__recent-documents-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="text-center">Nº de questões</th>
              <th className="text-right">Editar</th>
            </tr>
          </thead>
          <tbody>
            {myLastDocumentsList && myLastDocumentsList.map(document => (
              <tr
                key={document.id}
              >
                <td>
                  {document.name}
                </td>
                <td className="text-center">
                  {document.questions_quantity}
                </td>
                <td className="text-right">
                  <Button
                    onClick={() => switchActiveDocument(document)}
                  >
                    <FontAwesomeIcon icon="pencil-alt" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {myLastDocumentsList && myLastDocumentsList.length <= 0 ? <p className="text-center">Não tem provas</p> : (
          <p>
            <Link to="/documents/1" style={{ paddingLeft: '7px' }}>
            Ver mais provas
            </Link>
          </p>
        )}
      </Col>
      <Col sm="4">
        <h6><strong>Mais opções</strong></h6>
        <Button
          color="link"
          onClick={() => { showCreateDocumentModal(); }}
        >
          <p>
            <FontAwesomeIcon className="btn__icon" icon="plus" />
            Criar prova
          </p>
        </Button>
        <p>
          <Link to="/create-question">
            <FontAwesomeIcon className="btn__icon" icon="plus" />
            Criar questão
          </Link>
        </p>
        <Button
          color="link"
          onClick={() => showCreateClassPlanModal(selectedClassPlanType)}
        >
          <FontAwesomeIcon className="btn__icon" icon="plus" />
          Criar plano de aula
        </Button>
      </Col>
    </Row>
  );
};


export default MyDashboardRecentDocuments;
