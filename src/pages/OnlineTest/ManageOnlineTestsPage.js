import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Row, Col, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomPagination from 'components/pagination/CustomPagination';
import OnlineTestList from 'components/onlineTest/OnlineTestList';
import { Link } from 'react-router-dom';

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

const ManageOnlineTestsPage = (props) => {
  const {
    showDeleteModal, isFetchingOnlineTests, listMyOnlineTests, match, onlineTestsList,
    fetchBaseDocument, isFetchingBaseDocument, baseDocument,
  } = props;

  useEffect(() => {
    fetchBaseDocument(match.params.id);
    listMyOnlineTests(match.params.id, match.params.page);
  }, []);

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
              {onlineTestsList && onlineTestsList.results ? onlineTestsList.results.length : 0}
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
                      {getOrderNameField('name')}
                      {' '}
                      {' - '}
                      {' '}
                      {getOrderNameField('asc')}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem className="c-my-documents__dropdown-item" onClick={() => {}}>
                        Nome - Crescente
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

export default ManageOnlineTestsPage;
