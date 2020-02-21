import React from 'react';
import {
  Row, Col, Table, Button,
} from 'reactstrap';
import { first5Elements } from 'helpers/document';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyDashboardRecentDocuments = (props) => {
  const { myLastDocumentsList, switchActiveDocument, showCreateDocumentModal } = props;
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
            {myLastDocumentsList && first5Elements(myLastDocumentsList.results).map(document => (
              <tr
                key={document.id}
              >
                <td>
                  {document.name}
                </td>
                <td className="text-center">
                  {document.questions.length}
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
        {myLastDocumentsList && myLastDocumentsList.results && myLastDocumentsList.results.length <= 0 ? <p className="text-center">Não tem provas</p> : (
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
        <Link to="/create-classplan">
          <FontAwesomeIcon className="btn__icon" icon="plus" />
            Criar plano de aula
        </Link>
      </Col>
    </Row>
  );
};


export default MyDashboardRecentDocuments;
