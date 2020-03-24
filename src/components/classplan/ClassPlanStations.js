import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LearningObjectCard from 'components/learningObject/LearningObjectCard';
import QuestionCardSimple from 'components/question/QuestionCardSimple';
import DocumentCard from 'components/document/DocumentCard';

import { Link } from 'react-router-dom';

const ViewObjectCardButton = object => (
  <Link
    to={`/view-object/${object.id}`}
    title="Ver objeto"
    className="btn btn-secondary btn__icon"
  >
    <FontAwesomeIcon icon="eye" />
    {' Ver'}
  </Link>
);

const ViewQuestionCardButton = question => (
  <Link
    to={`/view-question/${question.id}`}
    title="Ver questão"
    className="btn btn-secondary btn__icon"
  >
    <FontAwesomeIcon icon="eye" />
    {' Ver'}
  </Link>
);

const ViewDocumentCardButton = (document, showDocumentModal) => (
  <Button className="btn-margin-right menu-top__document-button" onClick={() => showDocumentModal(document.id)}>
    <FontAwesomeIcon icon="eye" className="btn__icon" />
    Ver
  </Button>
);

const SingleStation = ({ station, position, showDocumentModal }) => (
  <>
    <Row>
      <Col sm="12">
        <h6><strong>{`Estação ${position + 1}`}</strong></h6>
      </Col>
    </Row>
    <Row className="mb-3 align-items-center">
      <Col sm="8" xs="9">
        {station.description_station}
      </Col>
      <Col sm="3" xs="9">
        {
            station.learning_object
            && <LearningObjectCard object={station.learning_object} button={ViewObjectCardButton(station.learning_object)} />
          }
        {
            station.document
            && <DocumentCard document={station.document} button={ViewDocumentCardButton(station.document, showDocumentModal)} />
        }
        {
            station.question
            && <QuestionCardSimple question={station.question} button={ViewQuestionCardButton(station.question)} />
        }
      </Col>
    </Row>
  </>
);


const ClassPlanStations = ({ stations, showDocumentModal }) => (
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
          <SingleStation station={station} position={i} showDocumentModal={showDocumentModal} />
        </div>
      )) }
    </div>
  </>
);
export default ClassPlanStations;
