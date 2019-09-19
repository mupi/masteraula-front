import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Alert, Button,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from 'helpers';

import CustomPagination from 'components/pagination/CustomPagination';
import HeadersList from 'components/headers/HeadersList';

import HomeUserPage from '../HomeUser/HomeUserPage';

const createNewHeader = (resetNewHeader) => {
  history.replace('/new-header');
  resetNewHeader();
};

const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Crescente';
    case 'desc': return 'Decrescente';
    case 'name': return 'Nome';
    case 'institution': return 'Instituição';
    case 'discipline': return 'Disciplina';
    case 'teacher': return 'Professor';
    default: return text;
  }
};

class MyHeadersPage extends React.Component {
  componentDidMount() {
    const {
      match, listMyHeaders, orderField, order,
    } = this.props;
    listMyHeaders(parseInt(match.params.page, 10), orderField, order);
  }

  componentDidUpdate(prevProps) {
    const {
      match, listMyHeaders, orderField, order,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)) {
      listMyHeaders(parseInt(match.params.page, 10), orderField, order);
    }
  }

  render() {
    const {
      myHeadersList, isFetchingMyHeaders, isDeleted, match, listMyHeaders, orderField, order, resetNewHeader,
    } = this.props;

    if (isDeleted) {
      listMyHeaders(parseInt(match.params.page, 10), orderField, order);
    }

    return (
      <HomeUserPage>
        <div className="c-my-headers__options">
          <Row className="c-headers-options">
            <Col sm="12" className="d-flex justify-content-end">
              <div className="p-2">
                <Link className="" to="/new-header">
                  <Button onClick={() => createNewHeader(resetNewHeader)}>
                    <FontAwesomeIcon icon="plus" className="btn__icon" />
                    Criar novo cabeçalho
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        <div className="c-my-headers">
          <Row>
            <Col sm="12">
              <h4>Meus Cabeçalhos</h4>
            </Col>
          </Row>
          <Row className="pagination-my-headers">
            {isFetchingMyHeaders
              ? (
                <Col sm="12">
                  <Alert className="alert--warning" color="warning" fade={false}>
                    Carregando ...
                  </Alert>
                </Col>
              ) : (
                <Col sm="12">
                  <CustomPagination {...this.props} {...myHeadersList} itensPerPage={10} />
                  <p className="c-my-headers__total-results">
                    {`Cabeçalhos encontrados: ${myHeadersList ? myHeadersList.count : 0}`}
                    {' '}
                  </p>
                  <div className="c-my-headers__dropdown-section">
                    <span className="c-my-headers__order-label">
                      Ordenar por:
                    </span>
                    <UncontrolledDropdown>
                      <DropdownToggle className="c-my-headers__dropdown-toogle" caret size="sm">
                        {' '}
                        {' '}
                        {getOrderNameField(orderField)}
                        {' '}
                        {' - '}
                        {' '}
                        {getOrderNameField(order)}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'name', 'asc')}>
                          Nome - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'name', 'desc')}>
                          Nome - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'institution', 'asc')}>
                          Instituição - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'institution', 'desc')}>
                          Instituição  - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'discipline', 'asc')}>
                          Disciplina - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'discipline', 'desc')}>
                          Disciplina - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'teacher', 'asc')}>
                          Professor - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'teacher', 'desc')}>
                          Professor - Decrescente
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  {myHeadersList
                    && <HeadersList headers={myHeadersList.results} {...this.props} />
                  }
                </Col>
              )}
          </Row>
        </div>
      </HomeUserPage>
    );
  }
}

MyHeadersPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listMyHeaders: PropTypes.func.isRequired,
  myHeadersList: PropTypes.shape(),
  orderField: PropTypes.string,
  order: PropTypes.string,
};

MyHeadersPage.defaultProps = {
  myHeadersList: null,
  orderField: 'name',
  order: 'asc',
};

export default MyHeadersPage;
