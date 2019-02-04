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
        {' '}
        <a
          className="c-question-base__link-askquestion"
          target="_blank"
          rel="noopener noreferrer"
          href="https://goo.gl/forms/bG2mMbMNNrNiOjqt2"
        >
          Não encontrou o que queria?
        </a>
      </Col>
      {questions.map(question => (
        <Col sm={sm} xs="12" key={question.id} className="question-card">
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
  sm: '4',
};

export default QuestionList;
