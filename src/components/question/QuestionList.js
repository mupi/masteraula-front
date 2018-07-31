import React from 'react';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = ({
  questions = [], count=0, sm = 4, onRate = f => f, onRemove = f => f,
}) => (
  <Row>
    <Col sm="12" className="c-question-base__total-results">Questões encontradas: { count }</Col>
    {questions.map((question, i) => (
      <Col sm={sm} xs="12" key={i} className="question-card">
        <QuestionCard {...question} />
      </Col>
    ))}
  </Row>
);

export default QuestionList;
