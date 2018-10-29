import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from './QuestionSourceYear';

const QuestionHeader = ({
  id, disciplines, source, year,
}) => (
  <Container>
    <Row className="c-question__tittle-section">
<Col>
      <h4> 
        <i className="fa fa-book" />
        {' '}
      Questão
      </h4>
      </Col>
      <Col md={{ size: 'auto', offset:1  }}>
      <DisciplineList list={disciplines}/>
      </Col>
      <Col>
      <QuestionSourceYear source={source} year={year}/>
      </Col>
    </Row>
  </Container>
);
export default QuestionHeader;
