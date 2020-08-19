import React from 'react';
import { Row, Col } from 'reactstrap';
import { getCleanCompleteStatement } from 'helpers/question';

/* eslint-disable react/no-danger */
const ClassPlanStudentArea = ({ classPlan }) => (
  <>
    <Row className="c-question__tittle-section">
      <Col><h5><strong>Orientações para o aluno</strong></h5></Col>
    </Row>
    <Row className="c-create-question__row-info">
      <Col sm="12" xs="12">
        <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(classPlan.guidelines) }} />
      </Col>
    </Row>
  </>
);
export default ClassPlanStudentArea;
