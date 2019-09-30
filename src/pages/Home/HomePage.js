import React from 'react';
import advFree from 'assets/img/home/1_free.png';
import advDocx from 'assets/img/home/2_docx.png';
import advQuestions from 'assets/img/home/3_questionsbd.png';
import advSearch from 'assets/img/home/4_search.png';
import advTeachers from 'assets/img/home/5_teachers.png';
import advAnswers from 'assets/img/home/6_answers.png';

import masteraulaDevice from 'assets/img/home/masteraula-screen.png';
import {
  Button, Container, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="c-public-home l-site-masteraula__public-home">
    <div className="c-public-home__banner">
      <Container>
        <Row className="align-items-center">
          <Col md="6" className="banner__text-side">
            <h1 className="c-public-home__main-title">
              Crie Provas em Minutos
            </h1>
            <p className="c-public-home__title-description">
                Com o Masteraula você gera uma prova em .doc com poucos cliques
            </p>
            <Button size="lg" color="success" className="c-public-home__signup-lg-btn">
              Cadastro gratuito
            </Button>
          </Col>
          <Col md="6">
            <img className="banner__img-ma-screen" src={masteraulaDevice} alt="masteraula-responsive" />
          </Col>
        </Row>
      </Container>
    </div>


    <Container className="c-public-home__video-section">
      <Row className="c-public-home__video-section-row">
        <Col md="12" className="c-public-home__video-section-col">
          <h2 className="c-public-home__video-section-title">Veja como funciona nossa plataforma</h2>
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
      </Row>
    </Container>

    <Container className="c-public-home__features">
      <Row>
        <Col md="12" className="c-public-home__l-features-title text-center">
          <h2 className="c-public-home__features-title">O que oferecemos?</h2>
        </Col>
        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advFree} alt="venda-questoes" />
          </div>
          <h5>
            GRATUITO!
          </h5>
          <p className="c-public-home__feature-description">
            Cadastro e download de 2 provas por mês.
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advDocx} alt="monte-questoes" />
          </div>
          <h5>
            GERADOR DE PROVAS
          </h5>
          <p className="c-public-home__feature-description">
            Download de provas em .doc em poucos minutos.
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advQuestions} alt="encontre-materiais" />
          </div>
          <h5>
            BANCO DE QUESTÕES
          </h5>
          <p className="c-public-home__feature-description">
            Ensino Médio, Fundamental II, vestibulares e vestibulinhos.
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advSearch} alt="encontre-materiais" />
          </div>
          <h5>
            FAÇA SEU PEDIDO
          </h5>
          <p className="c-public-home__feature-description">
            Não encontrou? Buscamos as questões para você!
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advTeachers} alt="encontre-materiais" />
          </div>
          <h5>
            QUESTÕES DE PROFESSORES
          </h5>
          <p className="c-public-home__feature-description">
            Crie e use questões de outros professores
          </p>
        </Col>

        <Col md="4" className="text-center">
          <div className="c-public-home__features-icon">
            <img src={advAnswers} alt="encontre-materiais" />
          </div>
          <h5>
            GABARITO
          </h5>
          <p className="c-public-home__feature-description">
            Todas as questões com gabarito.
          </p>
        </Col>
      </Row>
    </Container>

    <Container className="c-public-home__call-action-bg">
      <Row className="c-public-home__call-action-row">
        <Col md="12" className="c-public-home__call-action-col">
          <h3 className="c-public-home__call-action-text"> Comece já o seu acesso gratuito</h3>
          <Button size="lg" color="success" className="c-public-home__signup-lg-btn">
                Cadastre-se
          </Button>
        </Col>
      </Row>
    </Container>


  </div>
);

export default HomePage;
