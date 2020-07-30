import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassPlanTeacherArea = ({ classPlan }) => {
  return (
      <>
        <Row className="c-question__tittle-section">
            <Col>
                <h5>
                    <FontAwesomeIcon icon="chalkboard-teacher" />
                    {' '}
                    Área do professor
                </h5>
                <div className="border-top my-3" />
            </Col>
        </Row>
        <Row>
            <Col><h6><strong>Etapas</strong></h6></Col>
        </Row>
        <Row className="c-create-question__row-info">
            <Col sm="12" xs="12">
                {classPlan.phases}
            </Col>
        </Row>
        <Row>
            <Col><h6><strong>Conteúdo para lousa</strong></h6></Col>
        </Row>
        <Row className="c-create-question__row-info">
            <Col sm="12" xs="12">
                {classPlan.content}
            </Col>
        </Row>
      </>
    );
};
export default ClassPlanTeacherArea;

