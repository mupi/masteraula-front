import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import DeleteQuestionButtonContainer from 'containers/DeleteQuestionButtonContainer';
import {
  Alert, Row, Col,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Back from 'components/question/Back';
import BackUsingHistory from 'components/question/BackUsingHistory';

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

const ShowAddRemoveButton = (props) => {
  const { activeQuestion, activeDocument, removeSelectedQuestion } = props;
  return (
    isQuestionAdded(activeDocument, activeQuestion.id)
      ? (
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
      ) : ''
  );
};

const redirectURL = (e, role, isOwner, idQuestion) => {
  let url = '';
  e.preventDefault();
  if (isOwner) {
    url = `/edit-question/${idQuestion}`;
  } else if (role && role.includes('Editores')) {
    url = `/classify-question/${idQuestion}`;
  }

  history.push(url);
};

class QuestionPage extends Component {
  componentDidMount() {
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
    // history.push(`/view-question/${match.params.id}`);
  }

  render() {
    const {
      userId, activeQuestion, isFetching, rating, error, onRate, activeDocument, addSelectedQuestion,
      role, setQuestionIdToNewDocument, showModal, hideModal,
    } = this.props;

    const authorPk = (activeQuestion && activeQuestion.author) ? activeQuestion.author.pk : 'Anônimo';
    const isOwner = (authorPk === userId);

    if (isFetching) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
              Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    if (error || !activeQuestion) {
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
          <Row className="c-question__row-header-options c-question__row-header-options--fixed">
            <Col /*className="d-flex"*/>
              <BackUsingHistory />
              { (isOwner && !activeQuestion.disabled)
                ? (
                  <DeleteQuestionButtonContainer
                    questionId={activeQuestion.id}
                    customClass={!activeQuestion.disabled ? 'c-question__btn-remove-question btn__icon' : 'c-question__btn-remove-question'}
                    label={(
                      <span>
                        <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
                        Apagar
                      </span>
                    )}
                  />
                ) : ''}
              {(((role && role.includes('Editores')) || isOwner) && !activeQuestion.disabled)
                ? (
                  <Link
                    className="btn btn-secondary c-question__btn-back"
                    to="/"
                    onClick={(e) => { redirectURL(e, role, isOwner, activeQuestion.id); }}
                  >
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    {' '}
                    Editar
                  </Link>
                ) : ''}
            </Col>
          </Row>
          <Row className="c-question__options c-question--space-for-questionyear">
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
          {activeQuestion.disabled ? (
            <Row>
              <Col className="c-question__col-full-section-details">
                <Alert color="warning" className="c-question-edit__warning-message">
                  A questão
                  {' '}
                  N°
                  <strong>{activeQuestion.id}</strong>
                  {' '}
                  não está mais disponível
                </Alert>
              </Col>
            </Row>
          ) : ''}
          <Row className="justify-content-center">
            <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
              <QuestionContent
                alternatives={activeQuestion.alternatives}
                statement={activeQuestion.statement}
                resolution={activeQuestion.resolution}
                learningObjects={activeQuestion.learning_objects}
              />
              <div className="c-question__section-add-question">
                <Row>
                  {!isQuestionAdded(activeDocument, activeQuestion.id) && !activeQuestion.disabled ? (
                    <Col className="c-question__add-question-rectangle">
                      <h6 className="c-question__add-question-title">
                        Gostou da questão? Adicione a sua prova
                      </h6>
                      <AddQuestionButton
                        questionId={activeQuestion.id}
                        customClass="question-card__btn"
                        nameButton="Adicionar"
                        setQuestionIdToNewDocument={setQuestionIdToNewDocument}
                        activeDocument={activeDocument}
                        addSelectedQuestion={addSelectedQuestion}
                        showModal={showModal}
                        hideModal={hideModal}
                      />
                    </Col>
                  ) : (
                    <ShowAddRemoveButton {...this.props} />
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
              activeDocument={activeDocument}
              addSelectedQuestion={addSelectedQuestion}
              setQuestionIdToNewDocument={setQuestionIdToNewDocument}
              showModal={showModal}
              hideModal={hideModal}
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
