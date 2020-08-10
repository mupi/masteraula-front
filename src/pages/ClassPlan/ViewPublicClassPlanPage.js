
import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col,
} from 'reactstrap';
import ClassPlanStudentArea from 'components/classplan/ClassPlanStudentArea';
import BackUsingHistory from 'components/question/BackUsingHistory';
import PublicActivityContentList from 'components/activity/PublicActivityContentList';

const MenuAdminOptions = () => (
  <Row className="c-online__row-header-options c-online__row-header-options--fixed">
    <Col className="c-online__col-header-options">
      <BackUsingHistory />
    </Col>
  </Row>
);


/* CLASS PLAN TYPE */
const CLASSPLAN_TYPE = {
  STATIONS: 'S',
  OPEN: 'T', /* before traditional, now Open */
};

const PublicClassPlanStations = ({ classPlan }) => (
  <div>{classPlan.name}</div>
);

const PublicActivitiesSection = ({ activities }) => (
  <>
    <Row className="mb-2">
      <Col sm="12">
        <h5>
          <FontAwesomeIcon icon="book-reader" />
          {' '}
          Atividades
        </h5>
      </Col>
    </Row>
    <PublicActivityContentList activities={activities} />
  </>
);

const PublicOpenClassPlan = ({ classPlan }) => (
  <>
    {classPlan.activities && <PublicActivitiesSection activities={classPlan.activities} />}
  </>
);


const InnerPage = (props) => {
  const {
    isFetching, activePublicClassPlan, isLoggedIn,
  } = props;

  if (isFetching) {
    return (
      <Alert className="alert--warning" color="warning">
            Carregando ...
      </Alert>
    );
  }

  if (!activePublicClassPlan || activePublicClassPlan.disabled) {
    return (
      <Alert color="danger">
        O plano de aula não existe ou não está mais disponível
      </Alert>
    );
  }

  return (
    <>
      {isLoggedIn && <MenuAdminOptions {...props} />}
      <Row className={isLoggedIn ? 'c-question__options c-question--space-for-titlequestion' : 'mt-5 mb-3 align-items-center'}>
        { isLoggedIn && (
        <Col sm="12" style={{ marginBottom: '20px' }}>
          <Alert color="warning" className="mt-1 mb-1">
            Visualização do plano de aula para os alunos
          </Alert>
        </Col>
        )}
        <Col sm="12">
          <h4>
            <FontAwesomeIcon icon="book" />
            {' '}
            {'Plano de Aula'}
          </h4>
        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
          Nome
        </Col>
        <Col sm="8" xs="8">
          {activePublicClassPlan.name}
        </Col>
      </Row>
      <ClassPlanStudentArea classPlan={activePublicClassPlan} />
      {activePublicClassPlan.plan_type === CLASSPLAN_TYPE.OPEN
        ? <PublicOpenClassPlan classPlan={activePublicClassPlan} />
        : <PublicClassPlanStations classPlan={activePublicClassPlan} />
    }
    </>
  );
};


const ViewPublicClassPlanPage = (props) => {
  const {
    isLoggedIn, fetchPublicClassPlan, match,
  } = props;

  useEffect(() => {
    fetchPublicClassPlan(match.params.link);
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
export default ViewPublicClassPlanPage;
