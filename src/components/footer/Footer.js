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
        <a
          href="mailto:contato@masteraula.com.br"
          className="c-footer__contact-info-link"
          target="_blank"
          rel="noopener noreferrer"
          title="contato@masteraula.com.br"
        >
          contato@masteraula.com.br
        </a>
        {' | '}
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
            title="+55 (19) 999084183"
          >
            +55 (19) 999084183
          </a>
          {' | '}
        </span>
        <a
          href="/terms-use"
          className="c-footer__contact-info-link"
          target="_blank"
        >
            Termos de uso e privacidade
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
export default Footer;
