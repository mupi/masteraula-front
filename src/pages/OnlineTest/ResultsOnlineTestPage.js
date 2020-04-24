import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  Alert, Row, Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import OnlineTestBasicInfo from 'components/onlineTest/OnlineTestBasicInfo';
import OnlineTestQuestionsTable from 'components/onlineTest/OnlineTestQuestionsTable';
import OnlineTestStudentList from 'components/onlineTest/OnlineTestStudentList';

const ResultsOnlineTestPage = (props) => {
  const {
    isFetchingOnlineTest, fetchOnlineTest, match, activeOnlineTest,
    showStudentModal, showQuestionModal, userId,
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

  if (activeOnlineTest && activeOnlineTest.owner.pk !== userId) {
    return (
      <HomeUserPage>
        <Alert color="danger">
          A prova online não é de sua autoria
        </Alert>
      </HomeUserPage>
    );
  }

  const optionsQuestion = {
    showViewButton: true,
    removeOption: false,
    showTag: true,
    showScore: true,
  };

  const show = false;
  return (
    <HomeUserPage>
      <div className="c-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory />
            <Link
              className="btn btn-secondary c-question__btn-back"
              to={`/apply-online/${activeOnlineTest.link}`}
            >
              <FontAwesomeIcon icon="eye" className="btn__icon" />
              {' '}
              Pré-visualizar
            </Link>
          </Col>
        </Row>
        <Row className="c-question--space-for-titlequestion mb-4">
          { show && (
          <Col sm="12">
            <Alert color="danger" className="mb-4">
              <strong>Atenção: </strong>
              Esta prova possui questões dissertativas pendentes de correção. Atribua as notas manualmente antes de baixar os resultados finais.
            </Alert>
          </Col>
          )}
          <Col sm="12">
            <h4>
              {'Resultados da prova online: '}
              <span className="c-online__name">{activeOnlineTest.name}</span>
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{activeOnlineTest.document.name}</strong>
            </p>
          </Col>
        </Row>
        <OnlineTestBasicInfo onlineTest={activeOnlineTest} />
        <OnlineTestQuestionsTable questions={activeOnlineTest.questions_document} options={optionsQuestion} showQuestionModal={showQuestionModal} />
        { activeOnlineTest.results && activeOnlineTest.results.length > 0 && (
        <OnlineTestStudentList showStudentModal={showStudentModal} students={activeOnlineTest.results} />)}
      </div>
    </HomeUserPage>
  );
};

export default ResultsOnlineTestPage;
