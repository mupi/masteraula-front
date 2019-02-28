import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const PricingPage = () => (
  <div className="c-public-home l-site-masteraula__public-home">
    <Container className="c-public-home__features">
      <Row className="c-pricing-page__section">
        <Col sm="12" className="text-center c-pricing-page__section-info">
          <h2><strong>Conhece nossos planos</strong></h2>
          <p className="c-pricing-page__detail-text">Trusted by millions, Masteraula powers teams around the world. Check out which option is right for you.</p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <div className="c-pricing-page__item">
            <div className="c-pricing-page__item-top c-pricing-page__item--1">
              <h2>Free</h2>
              <p className="c-pricing-page__item-description"> A simple and powerful way to get things done. </p>
              <span className="c-pricing-page__item-price"> R$0 </span>
              <p> Free, forever.</p>
              <Button className="c-pricing-page__start-button" size="lg">Começa já</Button>
            </div>
            <div className="c-pricing-page__item-bottom">
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
            <div className="c-pricing-page__item-top c-pricing-page__item--2">
              <h2>Professor Parcial</h2>
              <p className="c-pricing-page__item-description"> A simple and powerful way to get things done. </p>
              <span className="c-pricing-page__item-price"> R$9,90 </span>
              <p> Free, forever.</p>
              <Button className="c-pricing-page__start-button" size="lg">Começa já</Button>
            </div>
            <div className="c-pricing-page__item-bottom">
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
            <div className="c-pricing-page__item-top c-pricing-page__item--3">
              <h2>Professor Completo</h2>
              <p className="c-pricing-page__item-description"> A simple and powerful way to get things done. </p>
              <span className="c-pricing-page__item-price"> R$19,90 </span>
              <p> Free, forever.</p>
              <Button className="c-pricing-page__start-button" size="lg">Começa já</Button>
            </div>
            <div className="c-pricing-page__item-bottom">
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
          <p className="c-pricing-page__detail-text">Trusted by millions, Masteraula powers teams around the world. Check out which option is right for you.</p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default PricingPage;
