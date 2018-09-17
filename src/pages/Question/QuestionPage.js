import QuestionHeader from 'components/question/QuestionHeader';
import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import {
  Alert, Container, Row, Col,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';

class QuestionPage extends Component {
  componentDidMount() {
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
  }

  render() {
    const {
      activeQuestion, isFetching, rating, error, onRate, toggleModal, modal, activeDocument, addSelectedQuestion,
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
              <QuestionContent
                alternatives={activeQuestion.alternatives}
                statement={activeQuestion.statement}
                resolution={activeQuestion.resolution}
              />
              <QuestionInfo question={activeQuestion} onRate={onRate} rating={rating} />

              <Container className="c-question__section-add-question">
                <Row>
                  {!isQuestionAdded(activeDocument, activeQuestion.id) ? (
                    <Col className="c-question__add-question-rectangle">
                      <h6 className="c-question__add-question-title">
                        Gostou da questão? Adicione a seu documento
                      </h6>
                      <AddQuestionButton
                        questionId={activeQuestion.id}
                        customClass="question-card__btn"
                        nameButton="Adicionar"
                        toggleModal={toggleModal}
                        modal={modal}
                        activeDocument={activeDocument}
                        addSelectedQuestion={addSelectedQuestion}
                      />
                    </Col>
                  ) : (
                    <Col className="c-question__add-question-rectangle">
                      <h6 className="c-question__add-question-title">
                        Esta questão foi adicionada ao documento
                        {' '}
                        <strong>
                          {activeDocument.name}
                        </strong>
                      </h6>
                      <span className="btn question-card__added">
                        <i className="fa fa-check-circle btn__icon" />
                          Adicionada
                      </span>
                    </Col>
                  )}
                </Row>
              </Container>
            </Col>
          </Row>
        </div>
        <div className="l-button-add-question">

          {!isQuestionAdded(activeDocument, activeQuestion.id) ? (
            <AddQuestionButton
              questionId={activeQuestion.id}
              customClass="o-button-add-question-doc o-button-add-question-doc--xl"
              toggleModal={toggleModal}
              modal={modal}
              activeDocument={activeDocument}
              addSelectedQuestion={addSelectedQuestion}
            />
          ) : (
            <span className="btn question-card__added">
              <i className="fa fa-check-circle btn__icon" />
              Adicionada
            </span>
          )}
        </div>
      </HomeUserPage>
    );
  }
}
export default QuestionPage;
