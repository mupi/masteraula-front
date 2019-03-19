import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = ({ year, version }) => (
  <div className="c-footer text-center">
    <Row>
      <Col xs="12">
        ©
        {year}
        {' '}
        Masteraula - Mupi vFim - versão
        {' '}
        {version}
      </Col>
    </Row>
  </div>
);
export default Footer;
