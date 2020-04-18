import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import {
  Row, Col, Alert,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';

import CustomPagination from 'components/pagination/CustomPagination';
import BackUsingHistory from 'components/question/BackUsingHistory';
import OnlineTestList from 'components/onlineTest/OnlineTestList';

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
    showDeleteModal, isFetchingOnlineTests, listMyOnlineTests, match, onlineTestsList, isDeleted,
  } = props;

  if (isDeleted) {
    listMyOnlineTests(parseInt(match.params.page, 10));
  }


  useEffect(() => {
    listMyOnlineTests(match.params.id, match.params.page);
  }, []);

  return (

    <HomeUserPage>
      <div className="c-my-documents">
        <Row className="c-question__row-header-options c-question__row-header-options--fixed">
          <Col className="c-question__col-header-options">
            <BackUsingHistory />
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion">
          <Col sm="12">
            <h4>
              {'Versões online de: '}
              <span className="c-online__name">Prova de Português</span>
            </h4>
          </Col>
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
                  && <OnlineTestList onlineTests={onlineTestsList.results} showDeleteModal={showDeleteModal} />
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
