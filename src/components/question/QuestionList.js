import React from 'react';
import { Row, Col } from 'reactstrap';
import QuestionCard from './QuestionCard';

const QuestionList = ({
  questions = [], count=0, sm = 4,  toggleModal, modal, activeDocument, addQuestion, addSelectedQuestion
}) => (
  <Row>
    <Col sm="12" className="c-question-base__total-results">
      Questões encontradas:
      { count }
    </Col>
    {questions.map((question, i) => (
      <Col sm={sm} xs="12" key={i} className="question-card">
        <QuestionCard
          {...question}
          toggleModal={toggleModal}
          modal={modal}
          activeDocument={activeDocument}
          addQuestion={addQuestion}
          addSelectedQuestion={addSelectedQuestion}
        />
      </Col>
    ))}
  </Row>
);

export default QuestionList;
