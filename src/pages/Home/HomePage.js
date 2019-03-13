import React from 'react';
import clockImg from 'assets/img/home/clock.png';
import searchImg from 'assets/img/home/search.png';
import moneyImg from 'assets/img/home/money.png';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => (
  <div className="c-public-home l-site-masteraula__public-home">
    <div className="c-public-home__banner">
      <Row>
        <Col md="12">
          <h1 className="c-public-home__main-title hidden">
            Biblioteca inteligente de questões
          </h1>
          <Col md="6" className="offset-md-3">
            <p className="c-public-home__title-description">
               Ganhe tempo na preparação de provas e atividades para o cotidiano escolar do Ensino Básico.
               Masteraula é uma plataforma para professores e escolas!
            </p>
          </Col>
        </Col>
      </Row>
    </div>

    <Container className="c-public-home__features">
      <Row>
        <Col md="4" className="text-center">
          <div className="o-thumb-circle">
            <img className="o-thumb-circle__img" src={moneyImg} alt="venda-questoes" />
          </div>
          <h4 className="hidden">
            Venda suas questões
          </h4>
          <p className="c-public-home__feature-description">
            Experimente!  Gere até 2 provas mensais gratuitamente (em formato .docx para você poder editar)
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="o-thumb-circle">
            <img className="o-thumb-circle__img" src={clockImg} alt="monte-questoes" />
          </div>
          <h4 className="hidden">
            Monte provas e testes em 5 minutos!
          </h4>
          <p className="c-public-home__feature-description">
          Ganhe tempo! Elaborar provas e listas de atividades será mais rápido
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="o-thumb-circle">
            <img className="o-thumb-circle__img" src={searchImg} alt="encontre-materiais" />
          </div>
          <h4 className="hidden">
            Encontre materiais online
          </h4>
          <p className="c-public-home__feature-description">
            Encontre questões de exames de todo Brasil e das diferentes áreas do conhecimento
          </p>
        </Col>
      </Row>
    </Container>
    <Container className="c-public-home__pricing-section">
      <Row className="c-public-home__pricing-section-row">
        <Col md="12" className="c-public-home__pricing-button-section"> 
          <Link className="btn c-public-home__pricing-button" to="/nossos-planos" role="button">
                Comece já
          </Link>
        </Col>
      </Row>

    </Container>
   
  </div>
);

export default HomePage;