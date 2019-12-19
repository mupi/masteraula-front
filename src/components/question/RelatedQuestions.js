import React from 'react';
import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionList from './QuestionList';

const RelatedQuestions = (props) => {
  const { rquestions } = props;

  return (
    <Container className="c-question__related-question">
      <Row className="c-question__tittle-section">
        <h4>
          <FontAwesomeIcon icon="clone" />
          {' '}
          Questões Relacionadas
        </h4>
      </Row>
      <QuestionList
        sm="4"
        questions={rquestions}
        count={rquestions.length}
        showLink={false}
        related
        {...props}
      />
    </Container>
  );
};

export default RelatedQuestions;
