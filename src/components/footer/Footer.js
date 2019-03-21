import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = ({ year, version }) => (
  <div className="c-footer text-center">
    <Row className="c-footer__section-info-contact">
      <Col xs="12">
        <FontAwesomeIcon
          className="btn__icon"
          icon="envelope"
        />
        <span>contato@masteraula.com.br</span>
        {' | '}
        {' '}
        <FontAwesomeIcon
          className="btn__icon"
          icon={['fab', 'whatsapp']}
        />
        <span>(19) 997702004</span>
      </Col>
    </Row>
    <Row className="c-footer__section-copyright">
      <Col xs="12">
        ©
        {' '}
        {year}
        {' '}
        Masteraula - Mupi - versão
        {' '}
        {version}
      </Col>
    </Row>
  </div>
);
export default Footer;
