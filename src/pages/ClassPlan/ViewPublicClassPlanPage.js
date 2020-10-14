
import React, { useEffect } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import HomeUserNotLoggedPage from 'pages/Home/HomeUserNotLoggedPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col,
} from 'reactstrap';
import ClassPlanPublicStudentArea from 'components/classplan/ClassPlanPublicStudentArea';
import BackUsingHistory from 'components/question/BackUsingHistory';
import PublicActivityContentList from 'components/activity/PublicActivityContentList';
import URLCopy from 'components/onlineTest/URLCopy';
import { masteraulaUrl } from 'helpers/config';
import { getCleanCompleteStatement } from 'helpers/question';

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
const PublicActivitiesSection = ({ activities, showActivityTitle }) => (
  <PublicActivityContentList activities={activities} showActivityTitle={showActivityTitle} />
);

const PublicOnlineTestSection = ({ onlineTests }) => (
  <>
    { onlineTests && onlineTests.map(ot => (
      <Row className="mb-2" key={ot.link}>
        <Col sm="12">
          <strong>{ot.name}</strong>
          <div className="my-2">
            <URLCopy url={`${masteraulaUrl}/apply-online/${ot.link}`} />
          </div>
        </Col>
      </Row>
    )) }
  </>
);

const PublicStationsSection = ({
  stations,
}) => (
  <>
    <Row className="c-question__tittle-section">
      <Col>
        <h5>
          <FontAwesomeIcon icon="sync-alt" />
          {' '}
          Estações
        </h5>
        <div className="border-top my-3" />
      </Col>
    </Row>
    <div className="c-classplan__stations">
      { stations && stations.map((station, i) => (
        <div className="c-classplan__view-station border-bottom my-3" key={station.id}>
          <PublicSingleStation
            station={station}
            position={i}
          />
        </div>
      )) }
    </div>
  </>
);

/* eslint-disable react/no-danger */
const PublicSingleStation = ({
  station, position,
}) => (
  <>
    <Row>
      <Col sm="12">
        <h6><strong>{`Estação ${position + 1}`}</strong></h6>
      </Col>
    </Row>
    <Row className="mb-3 align-items-center">
      <Col sm="12">
        <div dangerouslySetInnerHTML={{ __html: `Nome: ${getCleanCompleteStatement(station.name_station)}` }} />
      </Col>
      <Col sm="12" xs="12">
        <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(station.description_station) }} />
      </Col>
    </Row>
    {
            station.activity
            && (<PublicActivitiesSection activities={[{ ...station.activity }]} showActivityTitle={false} />)
          }
    {
            station.document_online
            && (<PublicOnlineTestSection onlineTests={[{ ...station.document_online }]} />)
        }
  </>
);

const PublicOpenClassPlan = ({ classPlan }) => (
  <>
    <ClassPlanPublicStudentArea classPlan={classPlan} />
    {classPlan.activities && <PublicActivitiesSection activities={classPlan.activities} />}
    {classPlan.documents_online && <PublicOnlineTestSection onlineTests={classPlan.documents_online} />}
  </>
);

const PublicClassPlanStations = ({ classPlan }) => (
  <div>{classPlan.stations && <PublicStationsSection stations={classPlan.stations} />}</div>
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
      <Row className="c-question__tittle-section">
        <Col sm="8" xs="8">
          <h6><strong>{activePublicClassPlan.name}</strong></h6>
        </Col>
      </Row>
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
