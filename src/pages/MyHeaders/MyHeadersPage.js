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
    case 'date': return 'Data de criação';
    default: return text;
  }
};

class MyHeadersPage extends React.Component {

  componentDidMount() {

  }

  render() {

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
            {false
              ? (
                <Col sm="12">
                  <Alert className="alert--warning" color="warning" fade={false}>
                    Carregando ...
                  </Alert>
                </Col>
              ) : (
                <Col sm="12">
                  <p className="c-my-headers__total-results">
                    {`Cabeçalhos encontrados: ${false ? 10 : 0}`}
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
                            {' Nome '}
                            {' - '}
                            {' Crescente '}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Nome - Crescente
                            </DropdownItem>
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Nome - Decrescente
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Data de criação - Crescente
                            </DropdownItem>
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Data de criação - Decrescente
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Nº Questões - Crescente
                            </DropdownItem>
                            <DropdownItem className="c-my-headers__dropdown-item">
                              Nº Questões - Decrescente
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Col>
                  </Row>
                  {true
                    && <HeadersList />
                  }
                </Col>
              )}
          </Row>

        </div>
      </HomeUserPage>);
  }
}


export default MyHeadersPage;
