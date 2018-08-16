import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = ({ questions, count, sm }) => (
  <Row>
    <Col sm="12" className="c-question-base__total-results">
      {`Questões encontradas: ${count}`}
    </Col>
    {questions.map(question => (
      <Col sm={sm} xs="12" className="question-card">
        <QuestionCard {...question} {...this.props} />
      </Col>
    ))}
  </Row>
);

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.number,
};

QuestionList.defaultProps = {
  questions: [],
  count: 0,
  sm: 4,
};

export default QuestionList;
