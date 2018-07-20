import React from 'react';
import { Container, Row } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

const QuestionComments = () => (
  <Container>
    <Row className="title-section-question">
      <h4>
        <i className="fa fa-comments" />
        {' '}
Comentários
      </h4>
    </Row>
  </Container>
);

export const oi = 'oi';

export default QuestionComments;
