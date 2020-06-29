import React from 'react';
import {
  Row, Col, Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';
import { formatDate } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from 'helpers';

const OpenClassPlanModalHeader = (props) => {
  const { children, id } = props;
  return (
    <td role="gridcell" onClick={() => history.push(`/view-classplan/${id}`)} style={{ cursor: 'pointer' }} className="c-my-documents__cell">
      {children}
    </td>
  );
};

const ClassPlanList = (props) => {
  const {
    showDeleteModal, classPlans, copyClassPlan,
  } = props;

  const handleDelete = (id, name) => {
    showDeleteModal(id, name);
  };

  return (
    <Row className="l-my-documents-list">
      <Col xs="12">
        <div className="c-my-classplans">
          <Table responsive hover>
            <thead align="center">
              <tr>
                <th>Nome</th>
                <th>Disciplinas</th>
                <th>Tipo</th>
                <th>Duração</th>
                <th>Data de criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody align="center">
              {classPlans && classPlans.map(classPlan => (
                <tr key={classPlan.id} style={{ cursor: 'pointer' }}>
                  <OpenClassPlanModalHeader id={classPlan.id}>
                    {classPlan.name}
                  </OpenClassPlanModalHeader>

                  <OpenClassPlanModalHeader id={classPlan.id}>
                    {classPlan.disciplines.map(t => t.name).join(', ')}
                  </OpenClassPlanModalHeader>
                  <OpenClassPlanModalHeader id={classPlan.id}>
                    {classPlan.plan_type === 'S' ? 'Rotação por Estações' : 'Tradicional'}
                  </OpenClassPlanModalHeader>
                  <OpenClassPlanModalHeader id={classPlan.id}>
                    {classPlan.duration}
                  </OpenClassPlanModalHeader>
                  <OpenClassPlanModalHeader id={classPlan.id}>
                    {formatDate(classPlan.create_date)}
                  </OpenClassPlanModalHeader>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle title="Mais ações" className="c-my-classplans__toggle">
                        <FontAwesomeIcon icon="ellipsis-h" />
                      </DropdownToggle>
                      <DropdownMenu className="label-item__dropdown-menu" right>
                        <DropdownItem
                          title="Ver plano de aula"
                          to={`/view-classplan/${classPlan.id}`}
                          tag={Link}
                        >
                          <FontAwesomeIcon icon="eye" />
                          {' '}
                          Ver
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem
                          title="Editar plano de aula"
                          to={`/edit-classplan/${classPlan.id}`}
                          tag={Link}
                        >
                          <FontAwesomeIcon icon="pencil-alt" />
                          {' '}
                          Editar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem onClick={() => copyClassPlan(classPlan.id)} title="Duplicar plano de aula">
                          <FontAwesomeIcon icon="copy" />
                          {' '}
                          Duplicar
                        </DropdownItem>
                        <DropdownItem divider className="label-item__divider" />
                        <DropdownItem className="c-my-classplans__btn-remove" onClick={() => handleDelete(classPlan.id, classPlan.name)} title="Apagar plano de aula">
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
          {classPlans && classPlans.length <= 0 && <div className="text-center">Não tem planos de aula</div>}
        </div>
      </Col>
    </Row>
  );
};

export default ClassPlanList;
