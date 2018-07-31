import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import learningObject2 from 'assets/img/home/question-objeto-aprendizagem2.jpg';
import AlternativeList from 'components/alternatives/AlternativeList';


const QuestionContent = ({ alternatives, statement, answer }) => (
  <Container className="c-question__full-statement">
    <Row>
      <Col sm="12" xs="12">
        <p className="">
          {statement}
        </p>
      </Col>
    </Row>
    <Row className="text-center">
      <Col sm="12" xs="12">
        <div className="c-question__learning-object">
          <img className="c-question__img" src={learningObject2} alt="objeto-aprendizagem" />
        </div>
      </Col>
    </Row>
    {alternatives
      ? (
        <Row className="c-question--section-border">
          <Col sm="12" xs="12" className="c-question__alternatives">
            <AlternativeList list={alternatives} />
          </Col>
        </Row>
      ) : ''}
    {answer
      ? (
        <Row className="c-question--section-border">
          <Col sm="12" xs="12">
            <p className="c-question__answer">
              {answer}
            </p>
          </Col>
        </Row>
      ) : ''}
  </Container>
);
export default QuestionContent;
