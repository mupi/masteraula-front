import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
} from 'reactstrap';

import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';
import StudentOnlineTestForm from 'components/onlineTest/StudentOnlineTestForm';
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


const InnerPage = () => (
  <div className="c-document">
    <Row className="mt-3 mb-3 align-items-center no-gutters">
      <Col sm="12" md={{ size: 8, offset: 2 }}>
        <h4>
          {'Prova online : '}
          <span className="c-online__name">{onlineTest.name}</span>
        </h4>
        <StudentTestBasicInfo />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 2 }} className="student-online__section">
        <StudentOnlineTestForm />
      </Col>
    </Row>
  </div>
);

const StudentOnlineTestPage = (props) => {
  const { isLoggedIn } = props;

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
