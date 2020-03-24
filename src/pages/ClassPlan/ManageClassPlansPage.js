import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import ClassPlanList from 'components/classplan/ClassPlanList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from '../HomeUser/HomeUserPage';

const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Crescente';
    case 'desc': return 'Decrescente';
    case 'name': return 'Nome';
    case 'create_date': return 'Data de criação';
    case 'disciplines': return 'Disciplina';
    case 'duration': return 'Duração';
    default: return text;
  }
};


class ManageClassPlansPage extends React.Component {
  componentDidMount() {
    const {
      // match, orderField, order,
      listMyClassPlans,
    } = this.props;

    // listMyClassPlans(parseInt(match.params.page, 10), orderField, order);
    listMyClassPlans(1, 'create_date', 'desc');
  }

  componentDidUpdate(prevProps) {
    const {
      match, listMyClassPlans, orderField, order,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)) {
      listMyClassPlans(parseInt(match.params.page, 10), orderField, order);
    }
  }

  render() {
    const {
      myClassPlansList, isFetchingClassPlans, isDeleted, match, listMyClassPlans, orderField, order,
      showDeleteModal, copyClassPlan,
    } = this.props;

    if (isDeleted) {
      listMyClassPlans(parseInt(match.params.page, 10), orderField, order);
    }

    return (
      <HomeUserPage>
        <div className="c-my-documents">
          <Row>
            <Col sm="12">
              <h4>Meus planos de aula</h4>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <CustomPagination {...this.props} {...myClassPlansList} disabled={isFetchingClassPlans} itensPerPage={10} className="pagination-my-classplans" />
              <p className="c-my-documents__total-results">
                {`Planos de aula encontrados: ${myClassPlansList ? (myClassPlansList.count) : 0}`}
                {' '}
              </p>
              { isFetchingClassPlans ? (
                <Alert className="alert--warning" color="warning" fade={false}>
                Carregando ...
                </Alert>
              ) : (
                <div>
                  <div className="c-my-documents__dropdown-section">
                    <span className="c-my-documents__order-label">
                      Ordenar por:
                    </span>
                    <UncontrolledDropdown>
                      <DropdownToggle className="c-my-documents__dropdown-toogle" caret size="sm">
                        {' '}
                        {' '}
                        {getOrderNameField(orderField)}
                        {' '}
                        {' - '}
                        {' '}
                        {getOrderNameField(order)}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'name', 'asc')}>
                          Nome - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'name', 'desc')}>
                          Nome - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'disciplines', 'asc')}>
                          Disciplina - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'disciplines', 'desc')}>
                          Disciplina - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'duration', 'asc')}>
                          Duração - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'duration', 'desc')}>
                          Duração - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'create_date', 'asc')}>
                          Data de criação - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyClassPlans(1, 'create_date', 'desc')}>
                          Data de criação - Decrescente
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

                  { myClassPlansList
                    && <ClassPlanList classPlans={myClassPlansList.results} showDeleteModal={showDeleteModal} copyClassPlan={copyClassPlan} />
                  }
                </div>
              )}
            </Col>
          </Row>

        </div>
      </HomeUserPage>
    );
  }
}

ManageClassPlansPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listMyClassPlans: PropTypes.func.isRequired,
  orderField: PropTypes.string,
  order: PropTypes.string,
};

ManageClassPlansPage.defaultProps = {
  orderField: 'name',
  order: 'asc',
};

export default ManageClassPlansPage;
