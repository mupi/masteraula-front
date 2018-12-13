import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionHeader = ({
  id, disciplines, source, year,
}) => (
  <div>
    <Row className="c-question__tittle-section">
      <Col>
        <h4>
          <FontAwesomeIcon icon="book" />
          {' '}
          Questão
        </h4>
      </Col>
    </Row>
    <Row className="hidden">
      <Col>
        <span className="c-question__label-tag-header c-question__tag--purple">
          {source}
          {' '}
          {year}
        </span>
        {disciplines && disciplines.map(discipline => (
          <span
            key={discipline.id}
            className="c-question__label-tag-header c-question__tag--pink"
          >
            {discipline.name}
          </span>
        ))}
      </Col>
    </Row>
  </div>
);
export default QuestionHeader;
