import React from 'react';
import { Container, Row } from 'reactstrap';

const QuestionComments = () => (
  <Container>
    <Row className="c-question__tittle-section">
      <h4>
        <i className="fa fa-comments" />
        {' '}
        Comentários
      </h4>
    </Row>
  </Container>
);

export default QuestionComments;
