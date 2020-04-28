import React, { useEffect, useState, useRef } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Row, Col, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import CustomPagination from 'components/pagination/CustomPagination';
import OnlineTestList from 'components/onlineTest/OnlineTestList';
import { Link } from 'react-router-dom';

const getOrderNameField = (text) => {
  switch (text) {
    case 'asc': return 'Crescente';
    case 'desc': return 'Decrescente';
    case 'name': return 'Nome';
    case 'question_number': return 'Nº questões';
    case 'result': return 'Nº alunos';
    default: return text;
  }
};
const ManageOnlineTestsPage = (props) => {
  const {
    showDeleteModal, isFetchingOnlineTests, listMyOnlineTests, match, onlineTestsList,
    fetchBaseDocument, isFetchingBaseDocument, baseDocument, orderField, order,
  } = props;

  const idBaseDoc = match.params.id;
  const { page } = match.params;

  const [, setPagenew] = useState();

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchBaseDocument(idBaseDoc);
    }

    listMyOnlineTests(idBaseDoc, parseInt(page, 10), orderField, order);
    setPagenew(page);
  }, [page]);

  if (isFetchingBaseDocument) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!baseDocument) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          A prova não existe
        </Alert>
      </HomeUserPage>
    );
  }

  return (

    <HomeUserPage>
      <div className="c-my-documents">
        <Row className="c-question__row-header-options c-question__row-header-options--fixed">
          <Col className="c-question__col-header-options">
            <Link
              className="btn btn-secondary c-question__btn-back"
              to="/documents/1"
            >
              <FontAwesomeIcon icon="arrow-circle-left" />
              {' '}
              Minhas provas
            </Link>
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion">
          <Col sm="12">
            <h4>
              {'Versões online de: '}
              <span className="c-online__name">{baseDocument.name}</span>
            </h4>
          </Col>
          { baseDocument.questions.length > 0 && (
          <Col sm="12">
            <Link
              className="btn btn-secondary"
              to={`/create-online/${match.params.id}`}
            >
              <FontAwesomeIcon icon="laptop" />
              {' Criar nova'}
            </Link>
          </Col>
          )}
        </Row>
        <Row>
          <Col sm="12">
            <CustomPagination {...props} {...onlineTestsList} disabled={isFetchingOnlineTests} itensPerPage={10} className="pagination-my-classplans" />
            <p className="c-my-documents__total-results">
              {'Provas online encontradas: '}
              {onlineTestsList && onlineTestsList.results ? onlineTestsList.count : 0}
            </p>
            { isFetchingOnlineTests ? (
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
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'name', 'asc')}>
                        Nome - Crescente
                      </DropdownItem>
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'name', 'desc')}>
                          Nome - Decrescente
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'question_number', 'asc')}>
                        Nº Questões - Crescente
                      </DropdownItem>
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'question_number', 'desc')}>
                        Nº Questões - Decrescente
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'result', 'asc')}>
                        Nº alunos - Crescente
                      </DropdownItem>
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => listMyOnlineTests(idBaseDoc, 1, 'result', 'desc')}>
                        Nº alunos - Decrescente
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>

                { onlineTestsList
                  && <OnlineTestList onlineTests={onlineTestsList.results} showDeleteModal={showDeleteModal} baseDocument={baseDocument} />
                }
              </div>
            )}
          </Col>
        </Row>

      </div>
    </HomeUserPage>
  );
};
ManageOnlineTestsPage.propTypes = {
  orderField: PropTypes.string,
  order: PropTypes.string,
};

ManageOnlineTestsPage.defaultProps = {
  orderField: 'name',
  order: 'asc',
};


export default ManageOnlineTestsPage;
