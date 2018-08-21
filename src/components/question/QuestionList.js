import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = (props) => {
  const { questions, count, sm } = props;
  return (
    <Row>
      <Col sm="12" className="c-question-base__total-results">
        {`Questões encontradas: ${count}`}
      </Col>
      {questions.map((question, key) => (
        <Col sm={sm} xs="12" key={key} className="question-card">
          <QuestionCard question={question} {...props} />
        </Col>
      ))}
    </Row>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  sm: PropTypes.string,
};

QuestionList.defaultProps = {
  questions: [],
  count: 0,
  sm: 4,
};

export default QuestionList;
