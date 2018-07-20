import React from 'react';
import { Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import QuestionCard from './QuestionCard';

const QuestionList = ({
  questions = [], numCols = 4, onRate = f => f, onRemove = f => f,
}) => (
  <Row>
    {questions.map((question, i) => (
      <Col sm={numCols} xs="12" key={i} className="question-card">
        <QuestionCard {...question} />
      </Col>
    ))}
  </Row>
);

export default QuestionList;
