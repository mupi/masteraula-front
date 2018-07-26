import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import learningObject2 from 'assets/img/home/question-objeto-aprendizagem2.jpg';
import AlternativeList from 'components/alternatives/AlternativeList';


const QuestionContent = ({ alternatives, statement, answer }) => (
  <Container className="question-content">
    <Row className=" section-text-question">
      <Col sm="12" xs="12">
        <p className="text-question">
          {statement}
        </p>
      </Col>
    </Row>
    <Row className="text-center">
      <Col sm="12" xs="12">
        <div className="img-learning-object">
          <img src={learningObject2} alt="objeto-aprendizagem" />
        </div>
      </Col>
    </Row>
    {alternatives
      ? (
        <Row className="question-section-border">
          <Col sm="12" xs="12">
            <AlternativeList list={alternatives} />
          </Col>
        </Row>
      ) : ''}
    {answer
      ? (
        <Row className="question-section-border">
          <Col sm="12" xs="12">
            <p className="text-answer">
              {answer}
            </p>
          </Col>
        </Row>
      ) : ''}
  </Container>
);
export default QuestionContent;
