import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from './QuestionSourceYear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionHeader = ({
  id, disciplines, source, year,
}) => (
  <Container> 
    <Row className="c-question__tittle-section">
<Col>
      <h4> 
        <FontAwesomeIcon icon="book" />
        {' '}
      Questão
      </h4>
      </Col>
      <Col md={{ size: 'auto', offset:1  }}>
      <DisciplineList list={disciplines}/>
      </Col>
      <Col>
        <QuestionSourceYear source={source} year={year} />
      </Col>
    </Row>
    <Row>
    </Row>
  </Container>
);
export default QuestionHeader;
