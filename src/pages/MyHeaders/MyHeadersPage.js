import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomPagination from 'components/pagination/CustomPagination';
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
        <div className="c-my-documents">
          <Row>
            <Col sm="12">
              <h4>Meus Cabeçalhos</h4>
            </Col>
          </Row>
          
          <Row>
            <Col sm="12" className="d-flex justify-content-end">
              <div className="p-2">
                <Button>
                  <FontAwesomeIcon
                    icon="plus"
                    className="btn__icon"
                  />
                  Criar novo
                </Button>
              </div>
              <div className="p-2">
                <Button>
                  <FontAwesomeIcon icon="eye" className="btn__icon" />
                  <span className="button-text">
                      Ver cabeçalhos
                  </span>
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="pagination-my-documents">
            {false
              ? (
                <Col sm="12">
                  <Alert className="alert--warning" color="warning" fade={false}>
                    Carregando ...
                  </Alert>
                </Col>
              ) : (
                <Col sm="12">
                  <p className="c-my-documents__total-results">
                    {`Cabeçalhos encontrados: ${false ? 10 : 0}`}
                    {' '}
                  </p>
                  <Row>
                    <Col sm="12" className="d-flex justify-content-end">
                      <div className="c-my-documents__dropdown-section">
                        <span className="c-my-documents__order-label">
                          Ordenar por:
                        </span>
                        <UncontrolledDropdown>
                          <DropdownToggle className="c-my-documents__dropdown-toogle" caret size="sm">
                              {' '}
                              {' '}
                              {' Nome '}
                              {' - '}
                            {' Crescente '}
                          </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem className="c-my-documents__dropdown-item" >
                                Nome - Crescente
                              </DropdownItem>
                              <DropdownItem className="c-my-documents__dropdown-item" >
                                Nome - Decrescente
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem className="c-my-documents__dropdown-item" >
                                Data de criação - Crescente
                              </DropdownItem>
                              <DropdownItem className="c-my-documents__dropdown-item" >
                                Data de criação - Decrescente
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem className="c-my-documents__dropdown-item" >
                                Nº Questões - Crescente
                              </DropdownItem>
                              <DropdownItem className="c-my-documents__dropdown-item" >
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
