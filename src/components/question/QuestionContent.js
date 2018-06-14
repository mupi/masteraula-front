import React  from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import learningObject from "../../assets/img/home/question-objeto-aprendizagem.jpg";
import learningObject2 from "../../assets/img/home/question-objeto-aprendizagem2.jpg";
import AlternativeList from "../../components/alternatives/AlternativeList"


const QuestionContent = ({alternatives, question ,answer}) =>
            <Container className="question-content">
              <Row className="text-center">
                  <Col sm="12" xs="12">
                    <div className="img-learning-object">
                      <img src={learningObject2}/>
                    </div>
                  </Col>
              </Row>
              <Row className="question-section-border section-text-question">
                <Col sm="12" xs="12">
                  <p className="text-question">{question}</p>
                </Col>
              </Row>
              <Row className="question-section-border">
                <Col sm="12" xs="12">
                  <AlternativeList list={alternatives} />
                </Col>
              </Row>
              {answer?
              <Row className="question-section-border">
                <Col sm="12" xs="12">
                  <p className="text-answer">
                    {answer}
                  </p>
                </Col>
              </Row>:''}
            </Container>


export default QuestionContent;
