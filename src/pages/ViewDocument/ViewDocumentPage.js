import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import DocumentList from 'components/document/DocumentList';

import CustomPagination from 'components/pagination/CustomPagination';
import HomeUserPage from '../HomeUser/HomeUserPage';

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
                  <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                    Carregando ...
                  </Alert>
                </Col>
              ) : (
                <Col sm="12">
                  <CustomPagination {...this.props} {...myDocumentsList} itensPerPage={10} />
                  <p className="c-my-documents__total-results">
                    {`${myDocumentsList ? (myDocumentsList.count) : 0} documentos encontrados`}
                    {' '}
                  </p>
                  <UncontrolledDropdown className="c-my-documents__dropdown">
                    <DropdownToggle caret size="sm">
                      Ordenar por:
                      {' '}
                      {' '}
                      {orderField || ''}
                      {' '}
                      {' - '}
                      {' '}
                      {order || ''}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'asc')}>
                        Nome - Ascendente
                      </DropdownItem>
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'name', 'desc')}>
                        Nome - Descendente
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'creation_date', 'asc')}>
                        Data - Ascendente
                      </DropdownItem>
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'creation_date', 'asc')}>
                        Data - Descendente
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'asc')}>
                        Questões - Ascendente
                      </DropdownItem>
                      <DropdownItem className="my-documents__dropdown-item" onClick={() => listMyDocuments(1, 'question_number', 'desc')}>
                        Questões - Descendente
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
};

ViewDocumentPage.defaultProps = {
  myDocumentsList: null,
};

export default ViewDocumentPage;
