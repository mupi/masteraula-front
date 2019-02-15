import {
  Container, Alert, Row, Col, Form, Button, Input,
} from 'reactstrap';
import { getTeachingLevel, getCleanCompleteStatement, getCleanAlternativeText } from 'helpers/question';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AlternativeList from 'components/alternatives/AlternativeList';
import Alternative from 'components/alternatives/Alternative';
import DisciplineList from 'components/disciplines/DisciplineList';
import DescriptorList from 'components/descriptors/DescriptorList';
import TagList from 'components/tags/TagList';
import { Field, FieldArray } from 'redux-form';
import QuestionAuthor from 'components/question/QuestionAuthor';

const difficultyList = {
  difficulties: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};

const renderField = ({
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
);


const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault, styleCustomize = 'form-control',
}) => (
  <div>
    <div>
      <select {...input} className={styleCustomize}>
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

const renderTagsLearningObjects = ({ fields }) => (
  <Row className="c-question__section-list-learning-objects">
    <Col sm="12" xs="12">
      {fields && fields.map(tag => (

        <Row className="c-question-edit__tags-learning-objects">
          {
            <Col sm="8">
              <Field
                component={renderField}
                type="text"
                name={`${tag}.name`}
                placeholder="Separe as tags com vírgulas"
                className="form-control"
              />
            </Col>}
        </Row>
      ))}
    </Col>
  </Row>
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
                src={`http://localhost:8000${learningObjectList[i].image}`}
              />
            </div>
          ) : ''}
          { (learningObjectList[i].text) ? (
            <div className="c-question__learning-object--text">
              <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObjectList[i].text) }} />
            </div>
          ) : ''}
          { (learningObjectList[i].source) ? (
            <p>
              <small>
                Fonte:
                {' '}
                <i>{learningObjectList[i].source}</i>
              </small>
            </p>
          ) : ''}
          <Row className="c-question-edit__tags-learning-objects">
            <Col sm="2" className="align-self-center text-right">
              <i>tags:</i>
            </Col>
            {<Col sm="8">
           

          {learningObjectList[i].tags && learningObjectList[i].tags.map((tag, i) => (
      <span key={i}> {tag.name},</span>
    ))}
          
            
            
         { /* <FieldArray name={`${learningObject}.tags`} component={renderTagsLearningObjects}/>*/
          }
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
        <Col sm="3" className="align-self-center">Assunto</Col>
        <Col sm="3" className="align-self-center">Subassunto</Col>
        <Col sm="3" className="align-self-center">Tópico</Col>
        <Col sm="3">
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
        const selSubject = selectedTopics[i].subject != null
          ? topicsList.find(s => s.id === parseInt(selectedTopics[i].subject, 10)) : null;
        const subsubjects = selSubject != null ? selSubject.childs : null;

        const selSubsubject = selectedTopics[i].subsubject != null
          ? subsubjects.find(s => s.id === parseInt(selectedTopics[i].subsubject, 10)) : null;
        const topics = selSubsubject != null ? selSubsubject.childs : null;

        return (
          <Row className="c-question__row-info c-question-edit__row-topic">
            <Col sm="3">
              <Field
                name={`${topicRow}.subject`}
                type="text"
                component={renderSelectField}
                className="form-control"
                label="Assunto"
                optionDefault="NaN"
              >
                { topicsList && topicsList.map(subject => (
                  <option value={subject.id}>
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
                className="form-control"
                label="Subassunto"
                optionDefault="NaN"
              >
                { subsubjects && subsubjects.map(subject => (
                  <option value={subject.id}>
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
                className="form-control"
                label="Tópico"
                optionDefault="NaN"
              >
                { topics && topics.map(subject => (
                  <option value={subject.id}>
                    {subject.name}
                  </option>
                )) }
              </Field>
            </Col>
            <Col sm="3">
              <Button
                type="button"
                title="Remove Member"
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
    const { fetchQuestion, match, listTopics } = this.props;
    fetchQuestion(match.params.id);
    listTopics();
  }

  render() {
    const {
      activeQuestion, isFetching, error, activeDocument, handleSubmit, topicsList, topics,
    } = this.props;

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

    return (
      <HomeUserPage>
        <ToastContainer hideProgressBar position="bottom-right" />
        <Form onSubmit={handleSubmit}>
          <div className="c-question">
            <Row>
              <Col className="d-flex">
                <Link className="mr-auto btn btn-secondary c-question__btn-back" to="/question-base/1" role="button">
                  <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
                  {' '}
                  Voltar
                </Link>
                <Button className="btn btn-secondary c-question__btn-back" to={`/edit-question/${activeQuestion.id}`} type="submit">
                  <FontAwesomeIcon
                    className="btn__icon"
                    icon="save"
                  />
                  {' '}
                  Salvar
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Alert color="warning" className="c-question-edit__warning-message">
                  Você está editando a questão
                  {' '}
                  N°
                  {activeQuestion.id}
                </Alert>
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
                  {(resolution && alternatives.length === 0)
                    ? (
                      <Row className="c-question--section-border c-question__section-answer">
                        <Col sm="12" xs="12">
                          <div className="c-question__answer">
                            <p className="c-question__answer-title">
                              Resposta:
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />
                          </div>
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
                            {resolution
                              ? (
                                <div
                                  className="c-question__resolution-text"
                                  dangerouslySetInnerHTML={
                                { __html: getCleanAlternativeText(resolution) }}
                                />) : ''
                            }
                          </div>
                        </Col>
                      </Row>
                    ) : ''}
                </div>
                <div className="c-question__section-add-question">
                  <QuestionListDocuments activeQuestion={activeQuestion} activeDocument={activeDocument} />
                </div>

                <Container className="question-information">
                  <Row className="c-question__tittle-section">
                    <h4>
                      <FontAwesomeIcon icon="info-circle" />
                      {' '}
                        Informações da Questão
                    </h4>
                  </Row>
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
                  <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                    Fonte
                    </Col>
                    <Col sm="8" xs="8">
                      <span className="question-info c-question__tag--purple">
                        {activeQuestion.source}
                      </span>
                    </Col>
                  </Row>
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
                      Autor
                    </Col>
                    <Col sm="8" xs="8">
                      <QuestionAuthor author={activeQuestion.author} styleTag="question-info author" />
                    </Col>
                  </Row>
                  {activeQuestion.tags && activeQuestion.tags.length > 0 ? (
                    <Row className="c-question__row-info">
                      <Col className="info-label" sm="4" xs="4">
                        Tags
                      </Col>
                      <Col sm="8" xs="8">
                        { /* <TagList list={activeQuestion.tags} styleTag="question-info  tag-name" /> */}
                        <Field
                          component={renderField}
                          type="text"
                          name="tags"
                          id="tags"
                          placeholder="Separe as tags com vírgulas"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                  ) : ' '}
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
                        className="form-control"
                        label="Selecione um nível de dificuldade"
                        optionDefault="NaN"
                        styleCustomize="form-control c-question-edit__select-difficulty"
                      >
                        { difficultyList && difficultyList.difficulties.map(difficulty => (
                          <option className="c-user-profile__state-city-dropdown-item" key={difficulty.id} value={difficulty.id}>
                            {getTeachingLevel(difficulty.name)}
                          </option>
                        )) }
                      </Field>
                    </Col>
                  </Row>
                  <FieldArray name="topics" component={renderTopics} topicsList={topicsList} selectedTopics={topics} />
                </Container>

              </Col>
            </Row>
          </div>
          <Row className="c-document__main-buttons text-center">
            <Col>
              <Button type="submit" title="Salvar questão" className="btn-secondary btn-margin-right">
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
