import React from 'react';
import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionComments = () => (
  <Container>
    <Row className="c-question__tittle-section">
      <h4>
        <FontAwesomeIcon icon="comments" />
        {' '}
        Comentários
      </h4>
    </Row>
  </Container>
);

export default QuestionComments;
