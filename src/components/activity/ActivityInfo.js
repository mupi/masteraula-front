import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import DisciplineList from 'components/disciplines/DisciplineList';
import TagList from 'components/tags/TagList';
import { getTeachingLevel } from 'helpers/question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ActivityInfo = ({
  activity,
  showReportError = true,
}) => (
  <div className="question-information">
    <Row className="c-question__tittle-section">
      <Col>
        <h4>
          <FontAwesomeIcon icon="info-circle" />
          {' '}
            Informações da Atividade
        </h4>
      </Col>
    </Row>
    <Row>
      <Col className="info-label" sm="4" xs="4">
          Disciplinas
      </Col>
      <Col sm="8" xs="8">
        <DisciplineList list={activity.disciplines} />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
        Nível de Ensino
      </Col>
      <Col sm="8" xs="8">
        <TagList list={activity.teaching_levels} styleTag="question-info  teaching-level" />
      </Col>
    </Row>
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
          Grau de dificuldade
      </Col>
      <Col sm="8" xs="8">
        <span className="question-info  difficulty-level">
          {getTeachingLevel(activity.difficulty)}
        </span>
      </Col>
    </Row>
    {activity.tags && activity.tags.length > 0 ? (
      <Row className="c-question__row-info c-question__row-tags">
        <Col className="info-label" sm="4" xs="4">
          Tags
        </Col>
        <Col sm="8" xs="8">
          <TagList list={activity.tags} styleTag="question-info  c-question__tag-name" />
        </Col>
      </Row>
    ) : ' '}
    {activity.all_topics && activity.all_topics.length > 0 ? (
      <Row className="c-question__row-info c-question__row-tags">
        <Col className="info-label" sm="4" xs="4">
          Tópicos
        </Col>
        <Col sm="8" xs="8">
          <TagList list={activity.all_topics} styleTag="question-info c-question__tag-name" />
        </Col>
      </Row>
    ) : ' '}
    <Row className="c-question__row-info">
      <Col className="info-label" sm="4" xs="4">
        Autoria
      </Col>
      <Col sm="8" xs="8">
        <span>
          {activity.owner.anonymous === true && activity.owner.nickname !== null ? ( 
            activity.owner.nickname
          ) : activity.owner.name}
        </span>
      </Col>
    </Row>
    { showReportError && (
      <Row>
        <Col className="text-center">
          <p>Essa atividade apresenta algum problema?</p>
          <a
            className="btn btn-danger c-question__btn-report-error"
            target="_blank"
            rel="noopener noreferrer"
            href="https://forms.gle/7TcMH3L6dDfuQcRH7"
          >
            <FontAwesomeIcon icon="exclamation-circle" className="btn__icon" />
          Reportar erro
          </a>
        </Col>
      </Row>
    )}
  </div>
);
ActivityInfo.propTypes = {
  activity: PropTypes.shape({}).isRequired,
};

ActivityInfo.defaultProps = {
};


export default ActivityInfo;
