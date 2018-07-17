import React from "react";
import clockImg from "assets/img/home/clock.png";
import searchImg from "assets/img/home/search.png";
import moneyImg from "assets/img/home/money.png";
import 'assets/css/Home.css';

const HomePage = ()=>
      <div className="public-home">
        <div className="row">
          <div className="banner-header col-md-12">
            <h1>Biblioteca inteligente de questões</h1>
            <div className="col-md-6 offset-md-3 texto-banner-header">
              <p className="">
              MasterAula é uma ferramenta feita por educadores para educadores onde você encontra milhares de questões para montar provas e testes.
              </p>
            </div>
          </div>
        </div>

        <div className="container caracteristicas-ma">
          <div className="row">

            <div className="col-md-4 text-center">
              <div className="thumb-circle">
                <img src={moneyImg} alt="venda-questoes"/>
                </div>
              <h4>Venda suas questões</h4>
              <p>Ganhe uma renda extra vendendo os materiais que você já criou para outros educadores da comunidade.</p>
            </div>

            <div className="col-md-4 text-center">
              <div className="thumb-circle"><img src={clockImg} alt="monte-questoes"/></div>
              <h4>Monte provas e testes em 5 minutos!</h4>
              <p>Otimize seu tempo de preparar aulas encontrando materiais curados por educadores de todo o Brasil.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="thumb-circle"><img src={searchImg} alt="encontre-materiais"/></div>
                <h4>Encontre materiais online</h4>
                <p>Busque por disciplina, assunto ou tipo de material para você adaptar e utilizar com seus alunos.</p>
              </div>
          </div>
        </div>
      </div>


export default HomePage;
