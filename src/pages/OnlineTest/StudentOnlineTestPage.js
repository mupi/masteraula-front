import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Alert,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import StudentOnlineTestForm from 'components/onlineTest/StudentOnlineTestForm';
import StudentOnlineTestQuestionsForm from 'components/onlineTest/StudentOnlineTestQuestionsForm';
import { formatDate } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';

const StudentInfo = ({ studentInfo }) => (
  <Row noGutters>
    <Col>
      <p className="c-online__questions-info">
        <span className="c-online__questions-info--label">
          <strong>Nome: </strong>
        </span>
        <span className="c-online__questions-info--value">{studentInfo.name}</span>
      </p>
    </Col>
    <Col>
      <p className="c-online__questions-info">
        <span className="c-online__questions-info--label">
          <strong>Série/Turma: </strong>
        </span>
        <span className="c-online__questions-info--value">{studentInfo.level}</span>
      </p>
    </Col>
  </Row>
);


const StudentTestBasicInfo = ({ onlineTest }) => (
  <>
    {onlineTest.questions_document && (
    <p className="c-online__total-questions-label">
      <strong>{`Total de ${onlineTest.questions_document.length} questões`}</strong>
    </p>
    )}
    <p className="c-online__questions-info">
      <span className="c-online__questions-info--label">
        <FontAwesomeIcon
          className="btn__icon"
          icon="clock"
        />
        <strong>Periodo ativo: </strong>
      </span>
      <span className="c-online__questions-info--value">{`Entre ${formatDate(onlineTest.start_date)} e ${formatDate(onlineTest.finish_date)}` }</span>
    </p>
    <p className="c-online__questions-info">
      <span className="c-online__questions-info--label">
        <FontAwesomeIcon
          className="btn__icon"
          icon="hourglass-start"
        />
        <strong>Duração: </strong>
      </span>
      <span className="c-online__questions-info--value">{`${onlineTest.duration} min`}</span>
    </p>
  </>
);


const StudentOnlineTestFirstPage = (props) => {
  const { basicOnlineTest } = props;
  return (
    <div>
      <Row className="mt-3 mb-3 align-items-center no-gutters">
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h4>
            {'Prova : '}
            <span className="c-online__name">{basicOnlineTest.name}</span>
          </h4>
          <StudentTestBasicInfo onlineTest={basicOnlineTest} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }} className="student-online__section">
          <StudentOnlineTestForm {...props} />
        </Col>
      </Row>
    </div>
  );
};

const MenuAdminOptions = ({ fullOnlineTest, isLoggedIn, userId }) => (
  <Row className="c-online__row-header-options c-online__row-header-options--fixed">
    <Col className="c-online__col-header-options">
      { isLoggedIn && fullOnlineTest.owner.pk === userId ? (
        <Link
          className="btn btn-secondary c-question__btn-back"
          to={`/view-online/${fullOnlineTest.link}`}
        >
          <FontAwesomeIcon icon="arrow-circle-left" />
          {' '}
        Ver detalhes
        </Link>
      )
        : <BackUsingHistory />}

    </Col>
  </Row>
);

const StudentOnlineTestSecondPage = (props) => {
  const {
    match, fetchStudentOnlineTest, isFetchingFullStudentOnlineTest, fullOnlineTest, isLoggedIn, userId,
  } = props;

  useEffect(() => {
    fetchStudentOnlineTest(match.params.id);
  }, []);

  if (isFetchingFullStudentOnlineTest) {
    return (
      <Alert className="alert--warning" color="warning">
        Carregando ...
      </Alert>
    );
  }

  if (!fullOnlineTest || fullOnlineTest.disabled) {
    return (
      <Alert color="danger">
        A prova não existe ou não está mais disponível
      </Alert>
    );
  }

  return (
    <>
      {isLoggedIn && <MenuAdminOptions {...props} />}
      <Row className={isLoggedIn ? 'c-question__options c-question--space-for-titlequestion no-gutters' : 'mt-3 mb-3 align-items-center no-gutters'}>
        { isLoggedIn && fullOnlineTest.owner.pk !== userId && (
        <Col sm="12">
          <Alert color="danger" className="mt-1 mb-1">
            A prova não é de sua autoria
          </Alert>
        </Col>
        )}
        { isLoggedIn && (
        <Col sm="12">
          <Alert color="warning" className="mt-1 mb-1">
            Visualização da prova online para os alunos
          </Alert>
        </Col>
        )}
        <Col sm="12">
          <h4>
            {'Prova : '}
            <span className="c-online__name">{fullOnlineTest.name}</span>
          </h4>
          <StudentTestBasicInfo onlineTest={fullOnlineTest} />
        </Col>
      </Row>
      { !isLoggedIn && <StudentInfo {...props} />}
      <Row className="mt-3 mb-3 align-items-center no-gutters">
        <Col>
          <StudentOnlineTestQuestionsForm {...props} questionsDocument={fullOnlineTest.questions_document} />
        </Col>
      </Row>
    </>
  );
};

const StudentOnlineTestThirdPage = () => (
  <div>
    <Row className="mt-3 mb-3 align-items-center no-gutters">
      <Col>
        <Alert color="success">
          Suas respostas foram enviadas com sucesso!
        </Alert>
      </Col>
    </Row>
  </div>
);

const InnerPage = (props) => {
  const {
    isLoggedIn, isFetchingBasicStudentOnlineTest, basicOnlineTest, answersSent,
  } = props;
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  if (isFetchingBasicStudentOnlineTest && !isLoggedIn) {
    return (
      <Alert className="alert--warning" color="warning">
            Carregando ...
      </Alert>
    );
  }

  if ((!basicOnlineTest || basicOnlineTest.disabled) && !isLoggedIn) {
    return (
      <Alert color="danger">
        A prova não existe ou não está mais disponível
      </Alert>
    );
  }

  /* if (isLoggedIn && basicOnlineTest && basicOnlineTest.owner.pk !== userId) {
    return (
      <Alert color="danger">
        A prova não é de sua autoria
      </Alert>
    );
  } */

  if (answersSent) {
    return <StudentOnlineTestThirdPage />;
  }


  return isLoggedIn ? (
    <StudentOnlineTestSecondPage {...props} />
  ) : (
    <>
      {page === 1 && <StudentOnlineTestFirstPage {...props} onSubmit={() => nextPage()} />}

      {page === 2 && (
      <StudentOnlineTestSecondPage
        {...props}
      />
      )}
    </>
  );
};

const StudentOnlineTestPage = (props) => {
  const {
    isLoggedIn, verifyOnlineTest, match,
  } = props;

  useEffect(() => {
    verifyOnlineTest(match.params.id);
  }, []);
  return isLoggedIn ? (
    <HomeUserPage>
      <InnerPage {...props} />
    </HomeUserPage>
  ) : (
    <HomeUserNotLoggedPage>
      <InnerPage {...props} />
    </HomeUserNotLoggedPage>
  );
};

StudentOnlineTestPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

export default StudentOnlineTestPage;
