import React from 'react';
import {
  Button, Row, Col, Alert }
from 'reactstrap';

const SuccessMessage = ({ message }) => (
  <Row>
    <Col sm="12">
      <Alert color="success" className="text-center" fade={true}>
        <p className="alert__message">
          <i className="fa fa-check-circle btn__icon" />
          {message}
        </p>
      </Alert>
    </Col>
  </Row>
);
export default SuccessMessage;
