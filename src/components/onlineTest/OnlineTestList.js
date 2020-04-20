import React from 'react';
import {
  Row, Col, Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';
import { formatDate } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from 'helpers';
import { masteraulaUrl } from 'helpers/config';

const OpenOnlineTestModalHeader = (props) => {
  const { children, id } = props;
  return (
    <td role="gridcell" onClick={() => history.push(`/view-online/${id}`)} style={{ cursor: 'pointer' }} className="c-my-documents__cell">
      {children}
    </td>
  );
};

const OnlineTestList = (props) => {
  const {
    showDeleteModal, onlineTests, baseDocument,
  } = props;

  const handleDelete = (id, name, idDocBase) => {
    showDeleteModal(id, name, idDocBase);
  };

  return (
    <Row className="l-my-documents-list">
      <Col xs="12">
        <div className="c-my-onlines">
          <Table responsive hover>
            <thead align="center">
              <tr>
                <th />
                <th>Nome</th>
                <th>Periodo de aplicação</th>
                <th>Nº de questões</th>
                <th>Duração</th>
                <th>Link</th>
                <th>Nº de alunos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody align="center">
              {onlineTests && onlineTests.map(onlineTest => (
                <tr key={onlineTest.link} style={{ cursor: 'pointer' }}>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    <FontAwesomeIcon
                      icon="circle"
                      className={`c-online__status ${onlineTest.status ? 'c-online__status--active' : 'c-online__status--inactive'}`}
                    />
                  </OpenOnlineTestModalHeader>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {onlineTest.name}
                  </OpenOnlineTestModalHeader>

                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {`De ${formatDate(onlineTest.start_date)} até ${formatDate(onlineTest.finish_date)}` }
                  </OpenOnlineTestModalHeader>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {onlineTest.questions_document.length}
                  </OpenOnlineTestModalHeader>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {onlineTest.duration}
                  </OpenOnlineTestModalHeader>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {`${masteraulaUrl}/apply-online/${onlineTest.link}`}
                  </OpenOnlineTestModalHeader>
                  <OpenOnlineTestModalHeader id={onlineTest.link}>
                    {onlineTest.results.length}
                  </OpenOnlineTestModalHeader>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle title="Mais ações">
                        <FontAwesomeIcon icon="ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu className="label-item__dropdown-menu" right>
                        <DropdownItem
                          title="Ver prova online"
                          to={`/view-online/${onlineTest.link}`}
                          tag={Link}
                        >
                          <FontAwesomeIcon icon="list" />
                          {' '}
                          Detalhes
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem
                          title="Ver prova online"
                          to={`/apply-online/${onlineTest.link}`}
                          tag={Link}
                        >
                          <FontAwesomeIcon icon="eye" />
                          {' '}
                          Pré-visualizar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem
                          title="Editar prova online"
                          to={`/edit-online/${onlineTest.link}`}
                          tag={Link}
                        >
                          <FontAwesomeIcon icon="pencil-alt" />
                          {' '}
                          Editar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem
                          title="Ver resultados"
                          to={`/results-online/${onlineTest.link}`}
                          tag={Link}
                          disabled={onlineTest.results.length <= 0}
                        >
                          <FontAwesomeIcon icon="chart-bar" />
                          {' '}
                          Resultados
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider hidden" />
                        <DropdownItem onClick={() => {}} title="Duplicar prova online" className="hidden">
                          <FontAwesomeIcon icon="copy" />
                          {' '}
                          Duplicar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem className="c-my-classplans__btn-remove" onClick={() => handleDelete(onlineTest.link, onlineTest.name, baseDocument.id)} title="Apagar prova online">
                          <FontAwesomeIcon icon="trash-alt" />
                          {' '}
                          Apagar
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {onlineTests && onlineTests.length <= 0 && <div className="text-center">Não tem provas online</div>}
        </div>
      </Col>
    </Row>
  );
};

export default OnlineTestList;
