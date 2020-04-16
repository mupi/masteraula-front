import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import OnlineTestBasicInfo from 'components/onlineTest/OnlineTestBasicInfo';
import OnlineTestQuestions from 'components/onlineTest/OnlineTestQuestions';
import {
  activeOnlineTest,
} from './activeOnlineTest';

const ViewOnlineTestPage = (props) => {
  const {
    isFetchingOnlineTest, fetchOnlineTest, match /* activeOnlineTest */, showDeleteModal, userId,
  } = props;


  useEffect(() => {
    fetchOnlineTest(match.params.id);
  }, []);

  if (isFetchingOnlineTest) {
    return (
      <HomeUserPage>
        <Alert className="alert--warning" color="warning">
            Carregando ...
        </Alert>
      </HomeUserPage>
    );
  }

  if (!activeOnlineTest || activeOnlineTest.disabled) {
    return (
      <HomeUserPage>
        <Alert color="danger">
            A prova online não existe ou não está mais disponível
        </Alert>
      </HomeUserPage>
    );
  }

  const authorPK = (activeOnlineTest && activeOnlineTest.owner) ? activeOnlineTest.owner.pk : 'Anônimo';
  const isOwner = (authorPK === userId);
  const optionsQuestion = {
    showViewButton: true,
    removeOption: false,
    showTag: true,
    showScore: true,
  };
  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            { (isOwner)
              ? (
                <Button
                  className="c-question__btn-remove-question"
                  color="danger"
                  onClick={() => showDeleteModal(activeOnlineTest.id, activeOnlineTest.name, activeOnlineTest.document.id)}
                  title="Apagar prova online"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                  {' '}
                    Apagar
                </Button>
              ) : ''}
            {(isOwner)
              ? (
                <Link
                  className="btn btn-secondary c-question__btn-back"
                  to={`/edit-online/${activeOnlineTest.id}`}
                >
                  <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                  {' '}
                  Editar
                </Link>
              ) : ''}

            <Link
              className="btn btn-secondary c-question__btn-back"
              to={`/apply-online/${activeOnlineTest.id}`}
            >
              <FontAwesomeIcon icon="eye" className="btn__icon" />
              {' '}
              Pré-visualizar
            </Link>
          </Col>
        </Row>
        <Row className="c-question__tittle-section c-question--space-for-titlequestion mb-4">
          <Col>
            <h4>
              <FontAwesomeIcon icon="laptop" />
              {' '}
              {'Prova Online : '}
              <span className="c-online__name">{activeOnlineTest.name}</span>
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{activeOnlineTest.document.name}</strong>
            </p>
          </Col>
        </Row>
        <OnlineTestBasicInfo onlineTest={activeOnlineTest} />
        <OnlineTestQuestions questions={activeOnlineTest.questions_document} options={optionsQuestion} />
      </div>
    </HomeUserPage>
  );
};

export default ViewOnlineTestPage;