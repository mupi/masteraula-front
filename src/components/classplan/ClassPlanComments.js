import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassPlanComments = ({ classPlan }) => {
  const hasComments = classPlan && classPlan.comment;

  return (
    (hasComments) && (
      <>
        <Row className="c-question__tittle-section">
          <Col>
            <h5>
              <FontAwesomeIcon icon="comments" />
              {' '}
                    Comentários do autor
            </h5>
            <div className="border-top my-3" />
          </Col>
        </Row>
        <Row className="c-create-question__row-info">
          <Col sm="12" xs="12">
            {classPlan.comment}
          </Col>
        </Row>
      </>
    ));
};
export default ClassPlanComments;
