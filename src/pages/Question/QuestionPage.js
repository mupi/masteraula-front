import QuestionHeader from 'components/question/QuestionHeader';
import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import RelatedQuestions from 'components/question/RelatedQuestions';
import QuestionComments from 'components/question/QuestionComments';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import { Alert, Row, Col } from 'reactstrap';

import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';


/* Questoes Relacionadas - test */
const questionTest = {
  rquestions: [
    {
      disciplines: [
        { name: 'Química' },
        { name: 'Física' },
      ],
      source: 'ENEM',
      year: '2010',
      teaching_levels: [
        {
          id: 1,
          name: 'Ensino Médio',
        },
        {
          id: 2,
          name: 'Ensino Fundamental',
        },
      ],
      author: {
        id: 8,
        username: 'cp.rosaless@gmail.com',
        name: 'Carmen Pamela Rosales Sedano',
        email: 'cp.rosaless@gmail.com',
      },
      statement: 'Assinale a alternativa : a) O discurso feminista de Susanitar denota certo machismo ...',
    },
  ],
};

class QuestionPage extends Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
  }

  render() {
    const {
      activeQuestion, isFetching, rating, error, onRate, toggleModal, modal, activeDocument
    } = this.props;

    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">

              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error) {
      return (
        <HomeUserPage>
          <Alert color="danger">

              Erro na questão
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <div className="c-question">
          <Row className="justify-content-center">
            <Col sm="12" md="12" xs="12">
              <QuestionHeader disciplines={activeQuestion.disciplines} source={activeQuestion.source} year={activeQuestion.year} />
              <QuestionContent alternatives={activeQuestion.alternatives} statement={activeQuestion.statement} answer={activeQuestion.resolution} />
              <QuestionInfo {...activeQuestion} onRate={onRate} rating={rating} />
              <QuestionComments />
              <RelatedQuestions rquestions={questionTest.rquestions} />
            </Col>
          </Row>
        </div>
        <div className="l-button-add-question">

          <AddQuestionButton
            questionId={activeQuestion.id}
            customClass="o-button-add-question-doc o-button-add-question-doc--xl"
            toggleModal={toggleModal}
            modal={modal}
            activeDocument={activeDocument}
          />
        </div>

      </HomeUserPage>
    );
  }
}
export default QuestionPage;
