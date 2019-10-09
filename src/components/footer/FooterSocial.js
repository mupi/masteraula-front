import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterSocial = ({ year, version }) => (
  <div className="c-footer text-center">
    <Row className="c-footer__section-info-contact align-items-center">
      <Col md="6" className="offset-md-3">
        <FontAwesomeIcon
          className="btn__icon"
          icon="envelope"
        />
        <a
          href="mailto:contato@masteraula.com.br"
          className="c-footer__contact-info-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          contato@masteraula.com.br
        </a>
        {' | '}
        {' '}
        <span className="c-footer__whatsap">
          <FontAwesomeIcon
            className="btn__icon"
            icon={['fab', 'whatsapp']}
          />
          <a
            href="https://api.whatsapp.com/send?l=pt&phone=5519999084183"
            target="_blank"
            rel="noopener noreferrer"
            className="c-footer__contact-info-link"
          >
            +55 (19) 999084183
          </a>
        </span>
      </Col>
      <Col md="3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.com/masteraulaprofessores"
        >
          <FontAwesomeIcon
            className="btn__icon c-footer__social-network-icon"
            icon={['fab', 'facebook-f']}
          />
        </a>
      </Col>
    </Row>
    <Row className="c-footer__section-copyright">
      <Col xs="12">
        {`© ${year} Masteraula - Mupi - versão ${version}`}
      </Col>
    </Row>
  </div>
);
export default FooterSocial;
