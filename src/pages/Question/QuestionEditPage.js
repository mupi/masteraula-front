/* eslint-disable react/no-danger */
import {
  Alert, Row, Col, Form, Button,
} from 'reactstrap';
import {
  getTeachingLevel, getCleanCompleteStatement, getCleanAlternativeText, getCleanLearningObjectSource,
} from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AlternativeList from 'components/alternatives/AlternativeList';
import Alternative from 'components/alternatives/Alternative';
import DisciplineList from 'components/disciplines/DisciplineList';
import DescriptorList from 'components/descriptors/DescriptorList';
import TagList from 'components/tags/TagList';
import { Field, FieldArray } from 'redux-form';
import QuestionAuthor from 'components/question/QuestionAuthor';
import { requiredSelectValidator, minLength2TagsForEdit, minLength1Topics } from 'helpers/validators';
// import MAReactTags from 'components/tags/MAReactTag';
import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';
import BackUsingHistory from 'components/question/BackUsingHistory';

const difficultyList = {
  difficulties: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};

/* const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    { touched
      && ((error && (
      <span className="error-message-text">
        {error}
      </span>
      ))
      || (warning && (
      <span>
        {' '}
        {warning}
        {' '}
      </span>
      )))
    }
  </div>
); */

const renderMAMultiSelectTag = ({
  input,
  placeholder,
  meta: {
    error,
  },
}) => (
  <div className="c-create-question__tags">
    <MAMultiSelectTag
      input={input}
      onChange={value => input.onChange(value)}
      placeholder={placeholder}
    />
    { error && (
    <span className="error-message-text">
      {error}
    </span>
    )
     }
  </div>
);

const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault, className,
}) => (
  <div>
    <div>
      <select {...input} className={className}>
        <option value={optionDefault}>
          {label}
        </option>
        {children}
      </select>
      {touched && error && (
      <span className="error-message-text">
          {error}
      </span>
      )}
    </div>
  </div>
);

const renderLearningObjects = ({ fields, learningObjectList }) => (
  <Row className="c-question__section-list-learning-objects">
    <Col sm="12" xs="12">
      {fields && fields.map((learningObject, i) => (
        <div className="c-question__learning-object" key={learningObjectList[i].id}>
          { (learningObjectList[i].image) ? (
            <div>
              <img
                alt="objeto-aprendizagem"
                src={learningObjectList[i].image}
                className="c-learning-object__img"
              />
            </div>
          ) : ''}
          { (learningObjectList[i].text) ? (
            <div className="c-question__learning-object--text">
              <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObjectList[i].text) }} />
            </div>
          ) : ''}
          { (learningObjectList[i].source) ? (
            <div className="c-question__learning-object--source">
              <div dangerouslySetInnerHTML={{ __html: getCleanLearningObjectSource(learningObjectList[i].source) }} />
            </div>
          ) : ''}
          <Row className="c-question-edit__tags-learning-objects">
            <Col sm="2" className="align-self-center c-question-edit__tags-learning-objects--position">
              <i>tags:</i>
            </Col>
            {
              <Col sm="8">
                <Field
                  name={`${learningObject}.tags`}
                  component={renderMAMultiSelectTag}
                  placeholder="Dê enter ou vírgula após inserir uma tag"
                />
              </Col>}
          </Row>
        </div>
      ))}
    </Col>
  </Row>
);

const renderTopics = ({
  fields, meta: { error, submitFailed }, topicsList, selectedTopics,
}) => (
  <Row>
    <Col md="12">
      <Row className="c-question__row-info c-question-edit__row-topic c-question-edit__header-topic">
        <Col sm="3" className="align-self-center hidden-xs">Assunto</Col>
        <Col sm="3" className="align-self-center hidden-xs">Subassunto</Col>
        <Col sm="3" className="align-self-center hidden-xs">Tópico</Col>
        <Col md="3" sm="6">
          <Button onClick={() => fields.push({})}>
            <FontAwesomeIcon
              icon="plus"
              className="btn__icon"
            />
            Adicionar tópicos
          </Button>
        </Col>
      </Row>
      <Row>{submitFailed && error && <span>{error}</span>}</Row>

      {fields.map((topicRow, i) => {
        const selSubject = (selectedTopics[i].subject != null && topicsList)
          ? topicsList.find(s => s.id === parseInt(selectedTopics[i].subject, 10)) : null;
        const subsubjects = selSubject != null ? selSubject.childs : null;

        const selSubsubject = (selSubject != null && selectedTopics[i].subsubject != null && subsubjects)
          ? subsubjects.find(s => s.id === parseInt(selectedTopics[i].subsubject, 10)) : null;
        const topics = selSubsubject != null ? selSubsubject.childs : null;

        return (
          <Row key={topicRow} className="c-question__row-info c-question-edit__row-topic">
            <Col sm="3">
              <Field
                name={`${topicRow}.subject`}
                type="text"
                component={renderSelectField}
                className="form-control c-create-question__form-field"
                label="Assunto"
                optionDefault="-1"
                styleCustomize="form-control c-question-edit__topic"
                validate={requiredSelectValidator}
              >
                { topicsList && topicsList.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                )) }
              </Field>
            </Col>
            <Col sm="3">
              <Field
                name={`${topicRow}.subsubject`}
                type="text"
                component={renderSelectField}
                className="form-control c-create-question__form-field"
                label="Subassunto"
                optionDefault="-1"
                styleCustomize="form-control c-question-edit__topic"
              >
                { subsubjects && subsubjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                )) }
              </Field>
            </Col>
            <Col sm="3">
              <Field
                name={`${topicRow}.topic`}
                type="text"
                component={renderSelectField}
                className="form-control c-create-question__form-field"
                label="Tópico"
                optionDefault="-1"
                styleCustomize="form-control c-question-edit__topic"
              >
                { topics && topics.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                )) }
              </Field>
            </Col>
            <Col sm="3" className="c-question-edit__col-btn-remove-topic">
              <Button
                type="button"
                title="Remover topico"
                className="c-question-edit__btn-remove-topic"
                onClick={() => fields.remove(i)}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                />
              </Button>
            </Col>
          </Row>
        );
      })}
      <Row>{error && <span className="error-message-text">{error}</span>}</Row>
    </Col>
  </Row>
);

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

class QuestionEditPage extends Component {
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
      activeQuestion, userId, isFetching, error, activeDocument, handleSubmit, topicsList, topics, pristine,
      role, submitting,
    } = this.props;

    const { author, authorship } = activeQuestion;

    const authorPK = activeQuestion.author ? activeQuestion.author.pk : null;
    const authorshipValue = authorship || (author && author.name);
    const publisher = author ? author.name : null;


    const {
      alternatives, statement, resolution,
    } = activeQuestion;

    const learningObjects = activeQuestion.learning_objects;

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

    if (activeQuestion && activeQuestion.disabled) {
      return (
        <HomeUserPage>
          <Alert color="danger">
            Questão não disponível para classificação
          </Alert>
        </HomeUserPage>
      );
    }

    if (!role.includes('Editores') && (authorPK !== userId)) {
      return (
        <HomeUserPage>
          <Alert color="danger">
              Você não tem permissão para visualizar esta página.
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <Form onSubmit={handleSubmit}>
          <div className="c-question">
            <Row className="c-question__row-header-options c-question__row-header-options--fixed">
              <Col className="c-question__col-header-options">
                <BackUsingHistory />
                <Link className="btn btn-secondary c-question__btn-back btn__icon hidden" to={`/view-question/${activeQuestion.id}`} role="button">
                  <FontAwesomeIcon icon="eye" className="btn__icon" />
                  {' '}
                  Visualizar
                </Link>
                <Button
                  className="btn btn-secondary c-question__btn-back"
                  to={`/classify-question/${activeQuestion.id}`}
                  type="submit"
                  title="Salvar questão"
                  disabled={submitting}
                >
                  <FontAwesomeIcon
                    className="btn__icon"
                    icon="save"
                  />
                  {' '}
                  Salvar
                </Button>
              </Col>
            </Row>
            <Row className="c-question__tittle-section c-question--space-for-titlequestion">
              <Col>
                <h4>
                  <FontAwesomeIcon icon="book" />
                  {' '}
                  Classificar Questão
                </h4>
              </Col>
            </Row>
            <Row>
              <Col className="c-question__col-full-section-details">
                <Alert color="warning" className="c-question-edit__warning-message">
                  Você está classificando a questão
                  {' '}
                  N°
                  <strong>{activeQuestion.id}</strong>
                  { (!pristine) ? '. Existem mudanças ainda não salvas na questão.' : ''
                  }
                </Alert>
              </Col>
            </Row>
            <Row className="c-question__options hidden">
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
            <Row className="justify-content-center">
              <Col className="c-question__col-full-section-details" sm="12" md="12" xs="12">
                <div className="c-question__full-statement">
                  {(learningObjects && learningObjects.length > 0)
                    ? (
                      <FieldArray name="learning_objects" component={renderLearningObjects} learningObjectList={learningObjects} />
                    ) : ''}
                  <Row className="c-question--section-border c-question__section-statement-text">
                    <Col sm="12" xs="12">
                      <div className="">
                        <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(statement) }} />
                      </div>
                    </Col>
                  </Row>
                  {(alternatives && alternatives.length > 0)
                    ? (
                      <Row className="c-question--section-border c-question__section-alternatives">
                        <Col sm="12" xs="12" className="c-question__alternatives">
                          <AlternativeList list={alternatives} />
                        </Col>
                      </Row>
                    ) : ''}

                  {(alternatives && alternatives.length > 0)
                    ? (
                      <Row className="c-question--section-border c-question__section-answer">
                        <Col sm="12" xs="12" className="c-question__alternatives">
                          <p className="c-question__answer-title">
                            Resposta:
                          </p>
                          <div>
                            {alternatives.map((alternative, i) => (
                              alternative.is_correct ? (
                                <Alternative
                                  key={alternative.id}
                                  option={i}
                                  text={alternative.text}
                                />
                              ) : ''
                            ))}
                          </div>
                        </Col>
                      </Row>
                    ) : ''}

                  {(resolution)
                    ? (
                      <Row className="c-question--section-border">
                        <Col sm="12" xs="12">
                          <div className="c-question__answer">
                            <p className="c-question__answer-title">
                              Resolução:
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />
                          </div>
                        </Col>
                      </Row>
                    ) : ''}
                </div>
                <div className="c-question__section-add-question">
                  <QuestionListDocuments activeQuestion={activeQuestion} activeDocument={activeDocument} />
                </div>

                <div className="question-information">
                  <Row className="c-question__tittle-section">
                    <Col>
                      <h4>
                        <FontAwesomeIcon icon="info-circle" />
                        {' '}
                          Informações da Questão
                      </h4>
                    </Col>
                  </Row>

                  { activeQuestion.source && (
                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                    Ano
                    </Col>
                    <Col sm="8" xs="8">
                      <span className="question-info c-question__tag--purple">
                        {activeQuestion.year}
                      </span>
                    </Col>
                  </Row>
                  )}
                  { activeQuestion.source && (
                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                       Vestibular
                    </Col>
                    <Col sm="8" xs="8">
                      <span className="question-info c-question__tag--purple">
                        {activeQuestion.source}
                      </span>
                    </Col>
                  </Row>
                  )}
                  <Row>
                    <Col className="info-label" sm="4" xs="4">
                        Disciplinas
                    </Col>
                    <Col sm="8" xs="8">
                      <DisciplineList list={activeQuestion.disciplines} />
                    </Col>
                  </Row>
                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                      Nível de Ensino
                    </Col>
                    <Col sm="8" xs="8">
                      <TagList list={activeQuestion.teaching_levels} styleTag="question-info  teaching-level" />
                    </Col>
                  </Row>
                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                      Publicador
                    </Col>
                    <Col sm="8" xs="8">
                      <QuestionAuthor author={publisher} styleTag="question-info author" />
                    </Col>
                  </Row>
                  {!activeQuestion.source ? (
                    <Row className="c-question__row-info">
                      <Col className="info-label" sm="4" xs="4">
                      Autoria
                      </Col>
                      <Col sm="8" xs="8">
                        <QuestionAuthor author={authorshipValue} styleTag="question-info author" />
                      </Col>
                    </Row>
                  ) : ' '}

                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                      Tags
                    </Col>

                    <Col sm="8" xs="8">
                      <Field
                        component={renderMAMultiSelectTag}
                        name="tags"
                        id="tags"
                        placeholder="Dê enter ou vírgula após inserir uma tag"
                        className="form-control"
                        validate={minLength2TagsForEdit}
                      />
                    </Col>
                  </Row>
                  {activeQuestion.descriptors && activeQuestion.descriptors.length > 0 ? (
                    <Row className="c-question__row-info">
                      <Col className="info-label" sm="4" xs="4">
                        Descritores
                      </Col>
                      <Col sm="8" xs="12">
                        <DescriptorList list={activeQuestion.descriptors} styleTag="question-info  descriptor-name" />
                      </Col>
                    </Row>
                  ) : ' '}


                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                        Grau de difuldade
                    </Col>
                    <Col sm="8" xs="8">
                      <Field
                        name="difficulty"
                        type="text"
                        component={renderSelectField}
                        className="form-control c-create-question__source-field c-create-question__form-field"
                        label="Selecione um nível de dificuldade"
                        optionDefault="0"
                        styleCustomize="form-control c-question-edit__select-difficulty"
                        validate={requiredSelectValidator}
                      >
                        { difficultyList && difficultyList.difficulties.map(difficulty => (
                          <option className="c-user-profile__state-city-dropdown-item" key={difficulty.id} value={difficulty.id}>
                            {getTeachingLevel(difficulty.name)}
                          </option>
                        )) }
                      </Field>
                    </Col>
                  </Row>
                  <FieldArray name="topics" component={renderTopics} topicsList={topicsList} selectedTopics={topics} validate={minLength1Topics} />
                  <Row>
                    <Col className="c-question__col-full-section-details">
                      { (!pristine) ? (
                        <Alert color="warning" className="c-question-edit__warning-message">
                          Existem mudanças ainda não salvas na questão
                        </Alert>
                      ) : ''
                      }
                    </Col>
                  </Row>
                </div>

              </Col>
            </Row>
          </div>
          <Row className="c-question__row-footer-options text-center">
            <Col>
              <Button type="submit" title="Salvar questão" className="btn-secondary btn-margin-right" disabled={submitting}>
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="save"
                />
                <span>
                  Salvar
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </HomeUserPage>
    );
  }
}
export default QuestionEditPage;
