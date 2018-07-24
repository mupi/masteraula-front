import React from "react";
import clockImg from "assets/img/home/clock.png";
import searchImg from "assets/img/home/search.png";
import moneyImg from "assets/img/home/money.png";
import { Row, Col } from 'reactstrap';

const HomePage = ()=>
      <div className="c-public-home l-site-masteraula__public-home">
        <div className="c-public-home__banner">
          <Row>
            <Col md="12">
              <h1 className="c-public-home__main-title">Biblioteca inteligente de questões</h1>
              <Col md="6" className="offset-md-3">
                <p className="c-public-home__title-description">
                MasterAula é uma ferramenta feita por educadores para educadores onde você encontra milhares de questões para montar provas e testes.
                </p>
              </Col>
            </Col>
          </Row>
        </div>

        <div className="c-public-home__features">
            <Row>
              <Col md="4" className="text-center">
                <div className="o-thumb-circle">
                  <img className="o-thumb-circle__img" src={moneyImg} alt="venda-questoes"/>
                  </div>
                <h4>Venda suas questões</h4>
                <p>Ganhe uma renda extra vendendo os materiais que você já criou para outros educadores da comunidade.</p>
              </Col>

              <Col md="4" className="text-center">
                <div className="o-thumb-circle">
                  <img className="o-thumb-circle__img" src={clockImg} alt="monte-questoes"/>
                </div>
                <h4>Monte provas e testes em 5 minutos!</h4>
                <p>Otimize seu tempo de preparar aulas encontrando materiais curados por educadores de todo o Brasil.</p>
              </Col>

              <Col md="4" className="text-center">
                <div className="o-thumb-circle">
                  <img className="o-thumb-circle__img" src={searchImg} alt="encontre-materiais"/>
                </div>
                <h4>Encontre materiais online</h4>
                <p>Busque por disciplina, assunto ou tipo de material para você adaptar e utilizar com seus alunos.</p>
              </Col>
          </Row>
        </div>
      </div>


export default HomePage;
