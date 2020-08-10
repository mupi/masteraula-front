
import React, { useState, useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import ClassPlanMainResources from 'components/classplan/ClassPlanMainResources';
import ClassPlanStudentArea from 'components/classplan/ClassPlanStudentArea';
import ClassPlanTeacherArea from 'components/classplan/ClassPlanTeacherArea';
import ClassPlanStations from 'components/classplan/ClassPlanStations';

const InnerPage = (props) => {
  const {
    isFetching, activePublicClassPlan,
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
        O plano não existe ou não está mais disponível
      </Alert>
    );
  }

  return (
    <div>
      <Row className="c-question__tittle-section c-question--space-for-titlequestion">
        <Col>
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
    </div>
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
