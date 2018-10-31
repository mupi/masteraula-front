import React from 'react';
import { Container, Row } from 'reactstrap';
import QuestionList from './QuestionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RelatedQuestions = ({ rquestions }) => (
  <Container className="c-question__related-question">
    <Row className="c-question__tittle-section">
      <h4>
      <FontAwesomeIcon icon="clone" />
        {' '}
Questões Relacionadas
      </h4>
    </Row>
    <QuestionList questions={rquestions} />
  </Container>
);

export default RelatedQuestions;
