import React from 'react';
import { Row, Col } from 'reactstrap';

import '../../assets/css/Footer.css';

const Footer = ({ year, version }) => (
  <div id="footer-container">
    <div id="footer" className="text-center container-fluid">
      <Row>
        <Col xs="12">
              ©
          {' '}
          {year}
          {' '}
MasterAula - Mupi - versão
          {' '}
          {version}
        </Col>
      </Row>
    </div>
  </div>
);
export default Footer;
