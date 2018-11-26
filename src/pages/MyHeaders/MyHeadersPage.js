import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';

import CustomPagination from 'components/pagination/CustomPagination';
import HeaderOptions from 'components/headers/HeaderOptions';
import HeadersList from 'components/headers/HeadersList';

import { ToastContainer } from 'react-toastify';
import HomeUserPage from '../HomeUser/HomeUserPage';
import 'react-toastify/dist/ReactToastify.css';

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
      myHeadersList, isFetchingMyHeaders, isDeleted, match, listMyHeaders, orderField, order,
    } = this.props;

    if (isDeleted) {
      listMyHeaders(parseInt(match.params.page, 10), orderField, order);
    }
 
    return (
      <HomeUserPage>
        <ToastContainer hideProgressBar position="bottom-right" />
        <HeaderOptions />

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
                  <Row>
                    <Col sm="12" className="d-flex justify-content-end">
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
                            <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'discipline', 'desc')}>
                              Disciplina - Crescente
                            </DropdownItem>
                            <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'discipline', 'desc')}>
                              Disciplina - Decrescente
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'professor', 'desc')}>
                              Professor - Crescente
                            </DropdownItem>
                            <DropdownItem className="c-my-headers__dropdown-item" onClick={() => listMyHeaders(1, 'professor', 'desc')}>
                              Professor - Decrescente
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Col>
                  </Row>
                  {myHeadersList
                    && <HeadersList headers={myHeadersList.results} {...this.props} />
                  }
                </Col>
              )}
          </Row>

        </div>
      </HomeUserPage>);
  }
}


export default MyHeadersPage;
