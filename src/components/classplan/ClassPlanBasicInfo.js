import React from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCleanCompleteStatement } from 'helpers/question';

/* eslint-disable react/no-danger */
const ClassPlanBasicInfo = ({ classPlan, user }) => {
  const hasTeachingYears = classPlan && classPlan.teaching_years && classPlan.teaching_years.length > 0;
  const hasTags = classPlan && classPlan.tags && classPlan.tags.length > 0;
  const hasBncc = classPlan && classPlan.bncc && classPlan.bncc.length > 0;
  const hasDescription = classPlan && classPlan.description && classPlan.description.trim() !== '<p></p>' && classPlan.description.trim() !== '';
  const hasDuration = classPlan && classPlan.duration;
  return (
    <>
      <Row className="c-question__tittle-section">
        <Col>
          <h5>
            <FontAwesomeIcon icon="info-circle" />
            {' '}
                      Informações básicas
          </h5>
          <div className="border-top my-3" />

        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Nome
        </Col>
        <Col sm="8" xs="8">
          {classPlan.name}
        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Disciplinas
        </Col>
        <Col sm="8" xs="8" className="c-classplan__disciplines">
          {classPlan.disciplines.map(discipline => <Badge key={`${discipline.id}-${discipline.name}`} color="success" pill>{discipline.name.trim()}</Badge>)}
        </Col>
      </Row>
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                      Tópicos
        </Col>
        <Col sm="8" xs="8" className="c-classplan__topics">
          {classPlan.topics.map(topic => <Badge key={`${topic.id}-${topic.name}`} color="success" pill>{topic.name.trim()}</Badge>)}
        </Col>
      </Row>
      {hasTags && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Tags
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.tags.map(tag => <Badge key={`${tag.id}-${tag.name}`} color="success" pill>{tag.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      {hasBncc && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                        BNCC
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.bncc.map(bncc => <Badge key={`${bncc.id}-${bncc.name}`} color="success" pill>{bncc.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                    Nível de Ensino
        </Col>
        <Col sm="8" xs="8" className="c-classplan__topics">
          {classPlan.teaching_levels.map(level => <Badge key={`${level.id}-${level.name}`} color="success" pill>{level.name.trim()}</Badge>)}
        </Col>
      </Row>
      {hasTeachingYears && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Ano
          </Col>
          <Col sm="8" xs="8" className="c-classplan__topics">
            {classPlan.teaching_years.map(teachingYear => <Badge key={`${teachingYear.id}-${teachingYear.name}`} color="success" pill>{teachingYear.name.trim()}</Badge>)}
          </Col>
        </Row>
      )}
      {hasDuration && (
        <Row className="c-classplan__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Duração da aula
          </Col>
          <Col sm="2" xs="6">
            {`${classPlan.duration} min`}
          </Col>
        </Row>
      )}
      <Row className="c-classplan__row-info">
        <Col className="info-label" sm="4" xs="4">
                   Autoria
        </Col>
        <Col sm="8" xs="8">
          {user.name}
        </Col>
      </Row>
      {hasDescription && (
        <Row className="c-question__tittle-section">
          <Col>
            <h5>
              <FontAwesomeIcon icon="pencil-alt" />
              {' '}
                    Etapas
            </h5>
            <div className="border-top my-3" />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(classPlan.phases) }} />
        </Col>
      </Row>
    </>
  );
};
export default ClassPlanBasicInfo;
