import QuestionContent from 'components/question/QuestionContent';
import QuestionInfo from 'components/question/QuestionInfo';
import AddQuestionButton from 'components/buttons/AddQuestionButton';
import RemoveQuestionButton from 'components/buttons/RemoveQuestionButton';
import DeleteQuestionButtonContainer from 'containers/DeleteQuestionButtonContainer';
import {
  Alert, Row, Col, Badge,
} from 'reactstrap';
import { isQuestionAdded } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BackUsingHistory from 'components/question/BackUsingHistory';
import RelatedQuestions from 'components/question/RelatedQuestions';
import { history } from 'helpers';
import { Helmet } from 'react-helmet';
import ListLabels from 'components/label/ListLabels';
import QuestionLabelItem from 'components/question/QuestionLabelItem';

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
            {...props}
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

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: true,
  removeOption: false,
  showTitle: false,
};

class QuestionPage extends Component {
  componentDidMount() {
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      fetchQuestion(id);
    }
  }

  render() {
    const {
      userId, activeQuestion, isFetching, rating, error, onRate, activeDocument, addSelectedQuestion,
      role, setQuestionIdToNewDocument, showModal, hideModal, labels, toggleApplyLabelToQuestion, isAddingRemovingLabel,
      addSelectedMyQuestionLabelFilter, removeSelectedLabelFromQuestion,
      showCreateMyQuestionLabelModal,
    } = this.props;

    const authorPk = (activeQuestion && activeQuestion.author) ? activeQuestion.author.pk : 'Anônimo';
    const isOwner = (authorPk === userId);
    const disciplines = (activeQuestion && activeQuestion.disciplines) ? activeQuestion.disciplines.map(d => (d.name)).join(' ,') : '';
    const tags = (activeQuestion && activeQuestion.tags) ? activeQuestion.tags.map(t => (t.name)).join(' ,') : '';

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
            A questão não existe ou não está disponível
          </Alert>
        </HomeUserPage>
      );
    }

    if (activeQuestion && activeQuestion.secret && !isOwner) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Você não tem autorização para ver a questão
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <Helmet>
          <title>
            {`Masteraula - Questão de ${disciplines}`}
          </title>
          <meta
            name="description"
            content={`Questão de ${disciplines} - ${tags}`}
          />
        </Helmet>
        <div className="c-question">
          <Row className="c-question__row-header-options c-question__row-header-options--fixed">
            <Col className="c-question__col-header-options">
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
              {activeQuestion.secret
                ? <Badge className="c-question__badge-privacity" color="info">PRIVADA</Badge> : <Badge className="c-question__badge-privacity" color="success">PÚBLICA</Badge>}
            </Col>
          </Row>


          <Row className="c-question__options">
            <Col className="d-flex  justify-content-end ">
              <div className="ml-auto">
                <div className="question-card__labels-section align-items-center">
                  <div className="question-card__labels-applied">
                    {activeQuestion.labels && activeQuestion.labels.map(label => (
                      <QuestionLabelItem
                        key={label.id}
                        label={label}
                        addSelectedMyQuestionLabelFilter={addSelectedMyQuestionLabelFilter}
                        removeSelectedLabelFromQuestion={removeSelectedLabelFromQuestion}
                        idQuestion={activeQuestion.id}
                      />
                    ))}
                  </div>
                  <ListLabels
                    question={activeQuestion}
                    labels={labels}
                    toggleApplyLabelToQuestion={toggleApplyLabelToQuestion}
                    isAddingRemovingLabel={isAddingRemovingLabel}
                    showCreateMyQuestionLabelModal={showCreateMyQuestionLabelModal}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="c-question__tittle-section no-gutters">
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
                <Alert color="danger" className="c-question-edit__warning-message">
                  A questão
                  {' '}
                  N°
                  <strong>{activeQuestion.id}</strong>
                  {' '}
                  foi removida pelo autor(a) e não está mais disponível
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
                options={options}
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
                        {...this.props}
                      />
                    </Col>
                  ) : (
                    <ShowAddRemoveButton {...this.props} />
                  )}
                </Row>
                <QuestionListDocuments activeQuestion={activeQuestion} activeDocument={activeDocument} />
              </div>
              <QuestionInfo question={activeQuestion} onRate={onRate} rating={rating} />
              {activeQuestion.related_questions && activeQuestion.related_questions.length > 0 ? (
                <RelatedQuestions ractivities={activeQuestion.related_activities} rquestions={activeQuestion.related_questions} {...this.props} />) : ''}
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
