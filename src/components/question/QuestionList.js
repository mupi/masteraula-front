import React from 'react';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = ({
  questions = [], sm = 4, onRate = f => f, onRemove = f => f,
}) => (
  <Row>
    <Col sm="12" className="c-question-base__total-results">Questões encontradas: { questions.length }</Col>
    {questions.map((question, i) => (
      <Col sm={sm} xs="12" key={i} className="question-card">
        <QuestionCard {...question} />
      </Col>
    ))}
  </Row>
);

export default QuestionList;
