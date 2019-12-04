import React from 'react';
import {
  Row, Col,
} from 'reactstrap';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

const PricingPageHome = () => {

  return (
    <HomeUserPage>
      <Row className="c-pricing-page__section">
        <Col sm="12" className="text-center c-pricing-page__section-info">
          <h2><strong>Conheça nossos planos</strong></h2>
          <p className="c-pricing-page__detail-text">Venha fazer parte de nossa comunidade de educadores de todo Brasil.</p>
        </Col>
      </Row>
      <Row className="row-eq-height justify-content-center">
        <Col md="4">
          <div className="c-pricing-page__item">
            <div className="c-pricing-page__item--2  c-pricing-page__item--full-borders">
              <h2>
                  Professor
                <br />
                  PREMIUM
              </h2>
              <p className="c-pricing-page__item-description">Para não se preocupar durante 1 SEMESTRE.</p>
              <p className="c-pricing-page__item-description">Acesso a todas disciplinas e download ilimitado.</p>
              <p className="c-pricing-page__item-price"> R$159,90 </p>
              <a
                href="https://pag.ae/7Vwf6UxB7/button"
                rel="noopener noreferrer"
                target="_blank"
                title="Pagar com PagSeguro"
              >
                <img
                  src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/205x30-pagar.gif"
                  alt="Pague com PagSeguro - é rápido, grátis e seguro!"
                  className="c-pricing-page__pagoseguro"
                />
              </a>
            </div>
            <div className="c-pricing-page__item-bottom hidden">
              <ul className="c-pricing-page__item-details">
                <li>
                  <span>
                      Acesso as questões de todas as disciplinas do ENEM
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>

        <Col md="4">
          <div className="c-pricing-page__item">
            <div className="c-pricing-page__item--3  c-pricing-page__item--full-borders">
              <h2>
                  Escola
                <br />
                  ILIMITADO
              </h2>
              <p className="c-pricing-page__item-description">Valores especiais para grupo de professores com acesso a todas disciplinas.</p>
              <p>
                  Entre em contato pelo e-mail
                {' '}
                <a href="mailto:contato@masteraula.com.br" className="c-pricing-page__contact-email">
                    contato@masteraula.com.br
                </a>
              </p>
            </div>
            <div className="c-pricing-page__item-bottom hidden">
              <ul className="c-pricing-page__item-details">
                <li>
                  <span>
                      Acesso as questões de todas as disciplinas de todos os vestibulares
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="c-pricing-page__section-bottom">
        <Col sm="12" className="text-center c-pricing-page__section-info">
          <p className="c-pricing-page__detail-text">
              Dúvidas e informações pelo e-mail
            {' '}
            <a href="mailto:contato@masteraula.com.br">contato@masteraula.com.br</a>
              .
            {' '}
              Estamos sempre disponíveis para nossos professores!
          </p>
        </Col>
      </Row>
    </HomeUserPage>

  );
};

export default PricingPageHome;
