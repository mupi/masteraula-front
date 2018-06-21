import React from 'react';
import { Container, Row } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import QuestionList from './QuestionList'

const RelatedQuestions = ({rquestions})=>  (
              <Container className="related-question">
                <Row className="title-section-question">
                      <h4><i className="fa fa-clone"></i> Questões Relacionadas</h4>
                </Row>
                  <QuestionList questions={rquestions} />
              </Container>
  )

export default RelatedQuestions
