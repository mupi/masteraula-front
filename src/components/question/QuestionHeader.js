import React from 'react';
import { Container, Row } from 'reactstrap';
import DisciplineList from 'components/disciplines/DisciplineList';
import QuestionSourceYear from './QuestionSourceYear';

const QuestionHeader = ({
  id, disciplines, source, year,
}) => (
  <Container>
    <Row>
      <DisciplineList list={disciplines} />
    </Row>

    <Row>
      <QuestionSourceYear source={source} year={year} />
    </Row>
    <Row className="c-question__tittle-section">
      <h4> 
        <i className="fa fa-book" />
        {' '}
Questão
      </h4>
    </Row>
  </Container>
);
export default QuestionHeader;
