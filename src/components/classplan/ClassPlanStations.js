import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentCard from 'components/document/DocumentCard';
import ActivityCard from 'components/activity//ActivityCard';
import { getCleanCompleteStatement } from 'helpers/question';

const ViewOnlineTestCardButton = (onlineTest, showOnlineTestModal) => (
  <Button className="btn-margin-right menu-top__document-button" onClick={() => showOnlineTestModal(document.id)}>
    <FontAwesomeIcon icon="eye" className="btn__icon" />
    Ver
  </Button>
);

const ViewActivityCardButton = (activity, showActivityModal) => (
  <Button className="btn-margin-right menu-top__document-button" onClick={() => showActivityModal(activity.id)}>
    <FontAwesomeIcon icon="eye" className="btn__icon" />
    Ver
  </Button>
);

const ViewDocumentCardButton = (document, showDocumentModal) => (
  <Button className="btn-margin-right menu-top__document-button" onClick={() => showDocumentModal(document.id)}>
    <FontAwesomeIcon icon="eye" className="btn__icon" />
    Ver
  </Button>
);

/* eslint-disable react/no-danger */
const SingleStation = ({
  station, position, showDocumentModal, showActivityModal,
}) => (
  <>
    <Row>
      <Col sm="12">
        <h6><strong>{`Estação ${position + 1}`}</strong></h6>
      </Col>
    </Row>
    <Row>
      <Col sm="12">
        <div dangerouslySetInnerHTML={{ __html: `Nome: ${getCleanCompleteStatement(station.name_station)}` }} />
      </Col>
    </Row>
    <Row className="mb-3 align-items-center">
      <Col sm="8" xs="9">
        <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(station.description_station) }} />
      </Col>
      <Col sm="3" xs="9">
        {/* {
            station.document
            && <OnlineTestCard onlineTest={station.document_online} button={ViewOnlineTestCardButton(station.document_online)} />
          } */}
        {
            station.document
            && <DocumentCard document={station.document} button={ViewDocumentCardButton(station.document, showDocumentModal)} />
        }
        {
            station.activity
            && <ActivityCard activity={station.activity} button={ViewActivityCardButton(station.activity, showActivityModal)} />
        }
      </Col>
    </Row>
  </>
);


const ClassPlanStations = ({ stations, showDocumentModal, showActivityModal }) => (
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
          <SingleStation station={station} position={i} showDocumentModal={showDocumentModal} showActivityModal={showActivityModal} />
        </div>
      )) }
    </div>
  </>
);
export default ClassPlanStations;
