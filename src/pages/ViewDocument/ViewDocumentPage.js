import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import DocumentList from 'components/document/DocumentList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from '../HomeUser/HomeUserPage';


const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Ascendente';
    case 'desc': return 'Descendente';
    case 'name': return 'Nome';
    case 'date': return 'Data de criação';
    case 'question_number': return 'Nº questões';
    default: return text;
  }
};


class ViewDocumentPage extends React.Component {
  componentDidMount() {
    const {
      match, listMyDocuments, orderField, order,
    } = this.props;
    listMyDocuments(parseInt(match.params.page, 10), orderField, order);
  }

  componentDidUpdate(prevProps) {
    const {
      match, listMyDocuments, orderField, order,
    } = this.props;
    if ((match.params.page !== prevProps.match.params.page)) {
      listMyDocuments(parseInt(match.params.page, 10), orderField, order);
    }
  }


  render() {
    const {
      myDocumentsList, isFetching, error, isDeleted, match, listMyDocuments, orderField, order,
    } = this.props;

    if (isDeleted) {
      listMyDocuments(parseInt(match.params.page, 10), orderField, order);
    }

    return (
      <HomeUserPage>
        {error ? (
          <Alert className="alert--danger" color="danger">
                  Ocorreu algum erro com sua solicitação, tente novamente.
          </Alert>
        ) : ''
        }
        <div className="c-my-documents">
          <Row>
            <Col sm="12">
              <p className="c-my-documents__search-info">
                Pesquisar em meus documentos
              </p>
              <InputGroup>
                <Input placeholder="Insira termos para pesquisar" />
                <InputGroupAddon addonType="prepend">
                  <Button>
                    Pesquisar
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row className="pagination-my-documents" style={{ marginTop: '1em' }}>
            {isFetching
              ? (
                <Col sm="12">
                  <Alert className="alert--warning" color="warning" fade={false}>
                    Carregando ...
                  </Alert>
                </Col>
              ) : (
                <Col sm="12">
                  <CustomPagination {...this.props} {...myDocumentsList} itensPerPage={10} />
                  <p className="c-my-documents__total-results">
                    {`Documentos encontrados: ${myDocumentsList ? (myDocumentsList.count) : 0}`}
                    {' '}
                  </p>
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
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'asc')}>
                          Nome - Ascendente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'desc')}>
                          Nome - Descendente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'date', 'asc')}>
                          Data de criação - Ascendente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'date', 'desc')}>
                          Data de criação - Descendente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'asc')}>
                          Nº Questões - Ascendente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'desc')}>
                          Nº Questões - Descendente
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  {myDocumentsList
                    && <DocumentList documents={myDocumentsList.results} {...this.props} />
                  }
                </Col>
              )}
          </Row>

        </div>
      </HomeUserPage>);
  }
}

ViewDocumentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listMyDocuments: PropTypes.func.isRequired,
  myDocumentsList: PropTypes.shape(),
  isFetching: PropTypes.bool.isRequired,
  orderField: PropTypes.string,
  order: PropTypes.string,
};

ViewDocumentPage.defaultProps = {
  myDocumentsList: null,
  orderField: 'name',
  order: 'asc',
};

export default ViewDocumentPage;
