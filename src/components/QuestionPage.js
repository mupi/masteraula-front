import React, { Component } from 'react';
import QuestionHeader from "./question/QuestionHeader.js";
import QuestionContent from "./question/QuestionContent.js";
import QuestionInfo from "./question/QuestionInfo.js";
import RelatedQuestions from "./question/RelatedQuestions";
import QuestionComments from "./question/QuestionComments.js";
import 'font-awesome/css/font-awesome.min.css';
import '../css/Question.css';

/* id, question, disiciplines, alternatives, answer, source, year, difficulty, author, teachingLevel, tags, descriptors, stars*/
const question = {
    "id":"100",
    "question": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha:",
    "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "alternatives": [
      {"text": "a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo por parte do autor da tirinha."},
      {"text": "b) Mafalda opõe-se ao discurso da amiga Susanita e, por meio de suas feições em todos os quadrinhos, percebe-se nitidamente seu descontentamento."},
      {"text": "c) A linguagem verbal não contribui para o melhor entendimento da tirinha, pois todo efeito de humor está contido na linguagem não verbal por meio da expressão exibida por Mafalda no último quadrinho."},
      {"text": "d) Susanita apresenta um discurso de acordo com as teorias feministas que pregam a libertação das práticas tradicionalmente atribuídas à mulher. Contudo, no último quadrinho, a personagem defende o uso de uma tecnologia que apenas reforça os padrões tradicionais."}
    ],
    "answer": "Alternativa “d”. Há uma quebra de expectativa, o que ocasionou o efeito de humor da tirinha. Susanita apresentou, até o terceiro quadrinho, um discurso condizente com as teorias feministas em voga nos anos 70. Todavia, no último quadrinho, ela demonstrou ter um conhecimento limitado sobre o assunto, elogiando o uso de uma tecnologia, a máquina de tricô, que apenas reforça os padrões tradicionais do comportamento feminino.",
    "source": "ENEM",
    "year": "2010",
    "difficulty": "Fácil",
    "author": "Thiago Oliveira dos Santos",
    "teachingLevels": [
      { "name": "Ensino Médio" },
      { "name": "Ensino Superior" }
    ],
    "tags": [
      { "name": "Temperatura" },
      { "name": "Condensação" }
    ],
    "descriptors": [
     {name: "Localizar informações explícitas"  },
     {name: "Inferir o sentido de uma palavra"}
   ],
    "stars":"3"}




class QuestionPage  extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="main-contenedor middle-box animated fadeInDown">
                <div className="contenedor-question">
                    <div className="row justify-content-center">
                      <div className="col-sm-5 col-md-5 col-lg-6 col-xs-12">
                      <QuestionHeader disciplines={question.disciplines} source={question.source} year={question.year} />
                      <QuestionContent alternatives={question.alternatives} question={question.question} answer={question.answer}/>
                      <QuestionInfo disciplines={question.disciplines}
                                    teachingLevels={question.teachingLevels}
                                    descriptors={question.descriptors}
                                    tags={question.tags}
                                    difficulty={question.difficulty}
                                    author={question.author}/>
                      <RelatedQuestions />
                      <QuestionComments />
                    </div>
                  </div>
                </div>
                <div className="btn-float">
                        <button type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
                </div>
            </div>
    );
  }
}

export default QuestionPage;
