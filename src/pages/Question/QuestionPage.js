import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import {
  Alert, Row, Col, Button,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from 'helpers/history';

const QuestionListDocuments = (props) => {
  const { activeQuestion, activeDocument } = props;
  const listDocumentFilter = ((activeDocument && activeQuestion.documents)
    ? activeQuestion.documents.filter(item => item.id !== activeDocument.id) : activeQuestion.documents);

  return (
    activeQuestion.documents && listDocumentFilter.length > 0
      ? (
        <Row className="c-question__list-documents">
          <Col className="c-question__add-question-rectangle">
            <p>
              Essa questão também está em suas provas:
              {' '}
              <strong>
                {listDocumentFilter.map(item => item.name).join(', ')}
              </strong>
            </p>
          </Col>
        </Row>
      ) : ''
  );
};

class QuestionPage extends Component {
  componentDidMount() {
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
  }

  render() {
    const {
      activeQuestion, isFetching, rating, error, onRate, toggleModal, modal, activeDocument, addSelectedQuestion,
      removeSelectedQuestion, role,
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
        <ToastContainer hideProgressBar position="bottom-right" />
        <div className="c-question">
          <Row>
            <Col className="d-flex">
              <Button onClick={() => history.replace('/question-base/1')} className="mr-auto btn btn-secondary c-question__btn-back">
                <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
                {' '}
                Voltar
              </Button>
              {role && role.includes('Editores')
                ? (
                  <Link className="btn btn-secondary c-question__btn-back" to={`/edit-question/${activeQuestion.id}`}>
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    {' '}
                Editar
                  </Link>
                ) : ''}
            </Col>
          </Row>
          <Row className="c-question__options">
            <Col className="d-flex  justify-content-end">
              <span className="c-question__label-tag-header c-question__tag--purple p-2">
                {activeQuestion.source}
                {' '}
                {activeQuestion.year}
              </span>
              {activeQuestion.disciplines && activeQuestion.disciplines.map(discipline => (
                <span
                  key={discipline.id}
                  className="c-question__label-tag-header c-question__tag--pink p-2"
                >
                  {discipline.name}
                </span>
              ))}
            </Col>

          </Row>
          <Row className="c-question__tittle-section">
            <Col>
              <h4>
                <FontAwesomeIcon icon="book" />
                {' '}
                Questão N°
                {' '}
                {activeQuestion.id}
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12" md="12" xs="12">
              <QuestionContent
                alternatives={activeQuestion.alternatives}
                statement={activeQuestion.statement}
                resolution={activeQuestion.resolution}
                learningObjects={activeQuestion.learning_objects}
              />
              <div className="c-question__section-add-question">
                <Row>
                  {!isQuestionAdded(activeDocument, activeQuestion.id) ? (
                    <Col className="c-question__add-question-rectangle">
                      <h6 className="c-question__add-question-title">
                        Gostou da questão? Adicione a sua prova
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
                        Esta questão foi adicionada à prova
                        {' '}
                        <strong>
                          {activeDocument.name}
                        </strong>
                      </h6>
                      <RemoveQuestionButton
                        questionId={activeQuestion.id}
                        activeDocumentId={activeDocument.id}
                        removeSelectedQuestion={removeSelectedQuestion}
                        label={(
                          <span>
                            <FontAwesomeIcon icon="minus" className="btn__icon" />
                            Remover
                          </span>
                        )}
                        customClass="c-question__btn-remove-question"
                      />
                    </Col>
                  )}
                </Row>
                <QuestionListDocuments activeQuestion={activeQuestion} activeDocument={activeDocument} />
              </div>

              <QuestionInfo question={activeQuestion} onRate={onRate} rating={rating} />


            </Col>
          </Row>
        </div>
        <div className="l-button-add-question">
          {/* TODO: mobile only button */}
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
              <FontAwesomeIcon icon="check-circle" className="btn__icon" />
              Adicionada
            </span>
          )}
        </div>
      </HomeUserPage>
    );
  }
}
export default QuestionPage;
