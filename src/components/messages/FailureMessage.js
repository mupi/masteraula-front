import React from 'react';
import { 
  Row, Col, Alert }
from 'reactstrap';

const FailureMessage = ({ message }) => (
  <Row>
    <Col sm="12">
      <Alert color="danger" className="text-center">
        <p className="alert__message">
          <i className="fa fa-exclamation-triangle btn__icon" />
          {message}
        </p>
      </Alert>
    </Col>
  </Row>
);
export default FailureMessage;
