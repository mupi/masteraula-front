import React from 'react';
import { Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaterialList from 'components/material/MaterialList';

const RelatedQuestions = (props) => {
  const { rquestions, ractivities } = props;

  return (
    <Container className="c-question__related-question">
      <Row className="c-question__tittle-section">
        <h4>
          <FontAwesomeIcon icon="clone" />
          {' '}
          Materiais Relacionados
        </h4>
      </Row>
      <MaterialList
              sm="4"
              questions={rquestions}
              activities={ractivities}
              // count={rquestions.length + ractivities.length}
              {...props}
            />
    </Container>
  );
};

export default RelatedQuestions;
