import React from 'react';
import clockImg from 'assets/img/home/clock.jpg';
import searchImg from 'assets/img/home/search.jpg';
import moneyImg from 'assets/img/home/money.jpg';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="c-public-home l-site-masteraula__public-home">
    <div className="c-public-home__banner">
      <Row>
        <Col md="12">
          <h1 className="c-public-home__main-title hidden">
            Banco inteligente de questões
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
    <Container className="c-public-home__video-section">
      <Row className="c-public-home__video-section-row">
        <Col md="12" className="c-public-home__video-section-col">
          <h2 className="c-public-home__video-section-title">Crie Provas em Minutos!</h2>
          <h5 className="c-public-home__video-section-title--sub">Assista nossa apresentação de como criar provas na plataforma MasterAula.</h5>
        </Col>
        <Col md="12" className="c-public-home__video-section-col">
          <iframe
            title="video-masteraula"
            className="c-public-home__video-iframe"
            src="https://www.youtube.com/embed/-4ZNtRvMMU4"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Col>
        <Col md="12" className="c-public-home__video-section-col">
          <Link className="btn c-public-home__pricing-button" to="/nossos-planos" role="button">
                Comece já
          </Link>
        </Col>
      </Row>

    </Container>

  </div>
);

export default HomePage;
