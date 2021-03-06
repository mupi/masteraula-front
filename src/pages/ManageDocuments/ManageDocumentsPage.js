import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import DocumentListContainer from 'containers/DocumentListContainer';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from '../HomeUser/HomeUserPage';

const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Crescente';
    case 'desc': return 'Decrescente';
    case 'name': return 'Nome';
    case 'date': return 'Data de criação';
    case 'question_number': return 'Nº questões';
    default: return text;
  }
};


class ManageDocumentsPage extends React.Component {
  componentDidMount() {
    const {
      match, listMyDocuments, listMyLastDocuments, orderField, order,
    } = this.props;

    listMyDocuments(parseInt(match.params.page, 10), orderField, order);
    listMyLastDocuments(1, 'date', 'desc');
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
      myDocumentsList, isFetchingMyDocuments, isDeleted, match, listMyDocuments, orderField, order,
    } = this.props;

    if (isDeleted) {
      listMyDocuments(parseInt(match.params.page, 10), orderField, order);
    }

    return (
      <HomeUserPage>
        <div className="c-my-documents">
          <Row className="hidden">
            <Col sm="12">
              <p className="c-my-documents__search-info">
                Pesquisar em minhas provas
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
          <Row>
            <Col sm="12">
              <h4>Minhas Provas</h4>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <CustomPagination
                className="pagination-my-documents"
                {...this.props}
                {...myDocumentsList}
                disabled={isFetchingMyDocuments}
                itensPerPage={10}
              />
              <p className="c-my-documents__total-results">
                {`Provas encontradas: ${myDocumentsList ? (myDocumentsList.count) : 0}`}
                {' '}
              </p>
              { isFetchingMyDocuments ? (
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
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'asc')}>
                          Nome - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'desc')}>
                          Nome - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'date', 'asc')}>
                          Data de criação - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'date', 'desc')}>
                          Data de criação - Decrescente
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'asc')}>
                          Nº Questões - Crescente
                        </DropdownItem>
                        <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'desc')}>
                          Nº Questões - Decrescente
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

                  { myDocumentsList
                    && <DocumentListContainer documents={myDocumentsList.results} />
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

ManageDocumentsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }),
  }).isRequired,
  listMyDocuments: PropTypes.func.isRequired,
  myDocumentsList: PropTypes.shape(),
  orderField: PropTypes.string,
  order: PropTypes.string,
};

ManageDocumentsPage.defaultProps = {
  myDocumentsList: null,
  orderField: 'name',
  order: 'asc',
};

export default ManageDocumentsPage;
