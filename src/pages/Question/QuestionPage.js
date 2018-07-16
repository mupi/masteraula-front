import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionHeader from "components/question/QuestionHeader.js";
import QuestionContent from "components/question/QuestionContent.js";
import QuestionInfo from "components/question/QuestionInfo.js";
import RelatedQuestions from "components/question/RelatedQuestions";
import QuestionComments from "components/question/QuestionComments.js";
import React, { Component, PropTypes } from 'react';

import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/Question.css';

/*Questoes Relacionadas - test*/
const questionTest = {
  "rquestions": [
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "author": {
                 "id": 8,
                 "username": "cp.rosaless@gmail.com",
                 "name": "Carmen Pamela Rosales Sedano",
                 "email": "cp.rosaless@gmail.com"
             },
    "statement": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    "urlImage": ""
    },
    { "disciplines": [
      { "name": "Matemática" },
      { "name": "Geometria" }
    ],
    "source": "ENEM",
    "year": "2018",
    "author": {
               "id": 8,
               "username": "cp.rosaless@gmail.com",
               "name": "Carmen Pamela Rosales Sedano",
               "email": "cp.rosaless@gmail.com"
           },
    "statement": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    },
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "author": {
               "id": 8,
               "username": "cp.rosaless@gmail.com",
               "name": "Carmen Pamela Rosales Sedano",
               "email": "cp.rosaless@gmail.com"
           },
    "statement": "Assinale a alternativa que melhor expresse o efeito de humor contido na tirinha: a) O discurso feminista de Susanita é responsável pelo efeito de humor, já que o tema é tratado de forma irônica, denotando certo machismo ...",
    }

  ]
}

class QuestionPage extends Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }

  render(){
    const { activeQuestion, rating, error, onRate } = this.props

    if(error) {
      return (
        <HomeUserPage>
          <div className="alert alert-danger">{error.message}</div>
        </HomeUserPage>
      )
    }

    return (
            <HomeUserPage>
              <div className="contenedor-question">
                  <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
                    <QuestionHeader disciplines={activeQuestion.disciplines} source={activeQuestion.source} year={activeQuestion.year} />
                    <QuestionContent alternatives={activeQuestion.alternatives} statement={activeQuestion.statement} answer={activeQuestion.resolution}/>
                    <QuestionInfo {...activeQuestion} onRate={onRate} rating={rating} />
                    <QuestionComments />
                    <RelatedQuestions rquestions={questionTest.rquestions} />

                  </div>
                </div>
              </div>
              <div className="btn-float">
                      <button type="button" className="btn btn-default btn-circle btn-xl btn-lateral"><i className="fa fa-plus"></i></button>
              </div>

            </HomeUserPage>
          );
        }
}
export default QuestionPage;
