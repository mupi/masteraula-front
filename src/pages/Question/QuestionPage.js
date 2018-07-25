import HomeUserPage from "../HomeUser/HomeUserPage"
import QuestionHeader from "components/question/QuestionHeader.js";
import QuestionContent from "components/question/QuestionContent.js";
import QuestionInfo from "components/question/QuestionInfo.js";
import RelatedQuestions from "components/question/RelatedQuestions";
import QuestionComments from "components/question/QuestionComments.js";
import AddQuestionButton from "components/buttons/AddQuestionButton.js";
import { Alert, Row, Col } from 'reactstrap';

import React, { Component } from 'react';

/*Questoes Relacionadas - test*/
const questionTest = {
  "rquestions": [
    { "disciplines": [
      { "name": "Química" },
      { "name": "Física" }
    ],
    "source": "ENEM",
    "year": "2010",
    "teaching_levels": [
               {
                   "id": 1,
                   "name": "Ensino Médio"
               },
               {
                   "id": 2,
                   "name": "Ensino Fundamental"
               }
           ],
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
    "teaching_levels": [
               {
                   "id": 1,
                   "name": "Ensino Médio"
               },
               {
                   "id": 2,
                   "name": "Ensino Fundamental"
               }
           ],
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
    "teaching_levels": [
               {
                   "id": 1,
                   "name": "Ensino Médio"
               },
               {
                   "id": 2,
                   "name": "Ensino Fundamental"
               }
           ],
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
    const { activeQuestion, isFetching, rating, error, onRate } = this.props

    if(isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      )
    }

    if(error) {
      return (
        <HomeUserPage>
          <Alert color="danger">
              Erro na questão
          </Alert>
        </HomeUserPage>
      )
    }

    return (
            <HomeUserPage>
              <div className="c-question">
                  <Row className="justify-content-center">
                    <Col sm="12" md="12" xs="12">
                      <QuestionHeader disciplines={activeQuestion.disciplines} source={activeQuestion.source} year={activeQuestion.year} />
                      <QuestionContent alternatives={activeQuestion.alternatives} statement={activeQuestion.statement} answer={activeQuestion.resolution}/>
                      <QuestionInfo {...activeQuestion} onRate={onRate} rating={rating} />
                      <QuestionComments />
                      <RelatedQuestions rquestions={questionTest.rquestions} />
                    </Col>
                 </Row>
              </div>
              <AddQuestionButton/>

            </HomeUserPage>
          );
        }
}
export default QuestionPage;
