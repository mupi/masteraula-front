import React from 'react';
import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionHeader from "components/question/QuestionHeader.js";
import QuestionContent from "components/question/QuestionContent.js";
import QuestionInfo from "components/question/QuestionInfo.js";
import RelatedQuestions from "components/question/RelatedQuestions";
import QuestionComments from "components/question/QuestionComments.js";
import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/Question.css';

/* id, question, disiciplines, alternatives, answer, source, year, difficulty, author, teachingLevel, tags, descriptors, stars*/
const questionTest = {
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
     {name: "D1 - Localizar informações explícitas"  },
     {name: "D2 - Inferir o sentido de uma palavra"}
   ],
    "stars":"3",
    "rquestions": [
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": "-"
      },
      { "disciplines": [
        { "name": "Matemática" },
        { "name": "Geometria" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2018",
      "author": "Diego Gonçalves Carvalho",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      },
      { "disciplines": [
        { "name": "Química" },
        { "name": "Física" }
      ],
      "descriptors": [
       {name: "D1"  },
       {name: "D2"}
     ],
      "source": "ENEM",
      "year": "2010",
      "author": "Thiago Oliveira dos Santos",
      "teachingLevels": [
        { "name": "Ensino Médio" },
        { "name": "Ensino Superior" }
      ],
      "extract": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
      "urlImage": ""
      }

    ]

  }


const QuestionPage = props => {

  const { id, question, rating } = props

  if(question){
      return  <HomeUserPage><div>Loading ... </div></HomeUserPage>;
  }

  return (
            <HomeUserPage>
                <div className="contenedor-question">
                    <div className="row justify-content-center">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
                      <QuestionHeader disciplines={questionTest.disciplines} source={questionTest.source} year={questionTest.year} />
                      <QuestionContent alternatives={questionTest.alternatives} question={questionTest.question} answer={questionTest.answer}/>
                      <QuestionInfo disciplines={questionTest.disciplines}
                                    teachingLevels={questionTest.teachingLevels}
                                    descriptors={questionTest.descriptors}
                                    tags={questionTest.tags}
                                    difficulty={questionTest.difficulty}
                                    author={questionTest.author}
                                    rating={rating}
                                  />
                      <RelatedQuestions rquestions={questionTest.rquestions} />
                      <QuestionComments />
                    </div>
                  </div>
                </div>
                <div className="btn-float">
                        <button type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
                </div>
            </HomeUserPage>
          );
        }

export default QuestionPage;
