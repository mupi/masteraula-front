import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LearningObjectCard from 'components/learningObject/LearningObjectCard';
// import QuestionCard from 'components/question/QuestionCard';
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

const ViewDocumentCardButton = () => (
  <Button className="btn-margin-right menu-top__document-button">
    <FontAwesomeIcon icon="eye" className="btn__icon" />
    Ver
  </Button>
);

const SingleStation = ({ station, position }) => (
  <>
    <Row>
      <Col sm="12">
        <h6>{`Estação ${position + 1}`}</h6>
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
              && <DocumentCard document={station.document} button={ViewDocumentCardButton(station.document)} filterTags />
            }
        {/*
                station.question
                && <QuestionCard question={station.question} button={ViewCardButton(station.learning_object)} filterTag={false} /> */
        }
      </Col>
    </Row>
  </>
);


const ClassPlanStations = ({ stations }) => (
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
    { stations && stations.map((station, i) => (<SingleStation station={station} key={station.id} position={i} />)) }
  </>
);
export default ClassPlanStations;
