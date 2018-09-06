import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AlternativeList from 'components/alternatives/AlternativeList';


const QuestionContent = (question) => {
  /* eslint-disable react/no-danger */
  const { statement, alternatives, answer } = question;

  return (
    <Container className="c-question__full-statement">
      <Row>
        <Col sm="12" xs="12">
          <div className="">
            <div dangerouslySetInnerHTML={{__html:statement}} ></div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col sm="12" xs="12">
          <div className="c-question__learning-object" style={{ display: 'none' }}>
            <img className="c-question__img" alt="objeto-aprendizagem" />
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
};
export default QuestionContent;
