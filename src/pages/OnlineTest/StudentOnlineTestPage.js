import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import StudentOnlineTestForm from 'components/onlineTest/StudentOnlineTestForm';
import StudentOnlineTestQuestions from 'components/onlineTest/StudentOnlineTestQuestions';
import { formatDate } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const onlineTest = {
  start_date: '2020-04-15T14:22:26.101Z',
  finish_date: '2020-04-29T14:22:29.084Z',
  duration: '35',
  questions_quantity: '5',
  name: 'Prova de Pré 2',
};


const StudentTestBasicInfo = () => (
  <>
    <p className="c-online__total-questions-label">
      <strong>{`Total de ${onlineTest.questions_quantity} questões`}</strong>
    </p>
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


const StudentOnlineTestFirstPage = props => (
  <div>
    <Row className="mt-3 mb-3 align-items-center no-gutters">
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <h4>
          {'Prova : '}
          <span className="c-online__name">{onlineTest.name}</span>
        </h4>
        <StudentTestBasicInfo />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 2 }} className="student-online__section">
        <StudentOnlineTestForm {...props} />
      </Col>
    </Row>
  </div>
);

const StudentOnlineTestSecondPage = () => (
  <div>
    <Row className="mt-3 mb-3 align-items-center no-gutters">
      <Col>
        <h4>
          {'Prova : '}
          <span className="c-online__name">{onlineTest.name}</span>
        </h4>
        <StudentTestBasicInfo />
      </Col>
    </Row>
    <Row className="mt-3 mb-3 align-items-center no-gutters">
      <Col>
        <StudentOnlineTestQuestions />
      </Col>
    </Row>
  </div>
);


const StudentOnlineTestPage = (props) => {
  const { isLoggedIn, handleSubmit } = props;
  const [page, setPage] = useState(1);


  const nextPage = () => {
    setPage(page + 1);
  };
  return isLoggedIn ? (
    <HomeUserPage>
      <StudentOnlineTestSecondPage />
    </HomeUserPage>
  ) : (
    <HomeUserNotLoggedPage>
      {page === 1 && <StudentOnlineTestFirstPage {...props} onSubmit={() => nextPage()} />}

      {page === 2 && (
      <StudentOnlineTestSecondPage
        onSubmit={handleSubmit}
      />
      )}
    </HomeUserNotLoggedPage>
  );
};

StudentOnlineTestPage.propTypes = {
  activeDocument: PropTypes.shape({}),
  removeSelectedQuestion: PropTypes.func,
};

export default StudentOnlineTestPage;
