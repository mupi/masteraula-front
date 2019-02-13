import QuestionTopics from 'components/question/test';
import {
  Container, Alert, Row, Col, Form, Button,
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
 input, label, type, meta: { touched, error } 
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault,
}) => (
  <div>
    <div>
      <select {...input} className="form-control">
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

const renderLearningObjects = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>
Member #
          {index + 1}
        </h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
      </li>
    ))}
  </ul>
);

const renderTopics = ({ fields, meta: { error, submitFailed } }) => (
  <Row>
    <Col md="12">
      <Row className="c-question__row-info">
        <Col sm="3">Assunto</Col>
        <Col sm="3">Subassunto</Col>
        <Col sm="3">Tópico</Col>
        <Col sm="3">
          <Button onClick={() => fields.push({})}>
            <FontAwesomeIcon
              icon="plus"
            />
            Adicionar tópicos
          </Button>
        </Col>
      </Row>
      {submitFailed && error && <span>{error}</span>}
      {fields.map((member, index) => (
        <Row key={index} className="c-question__row-info">
          <Col sm="3">
            <Field
              name="subject"
              type="text"
              component={renderSelectField}
              className="form-control"
              label="Assunto"
              optionDefault="NaN"
            >
              <option className="c-user-profile__state-city-dropdown-item">
                Assunto
              </option>
            </Field>
          </Col>
          <Col sm="3">
            <Field
              name="subsubject"
              type="text"
              component={renderSelectField}
              className="form-control"
              label="Subassunto"
              optionDefault="NaN"
            >
              <option className="c-user-profile__state-city-dropdown-item">
                  Subassunto
              </option>
            </Field>
          </Col>
          <Col sm="3">
            <Field
              name="topic"
              type="text"
              component={renderSelectField}
              className="form-control"
              label="Tópico"
              optionDefault="NaN"
            >
              <option className="c-user-profile__state-city-dropdown-item">
                  Tópico
              </option>
            </Field>
          </Col>
          <Col sm="3">
            <Button
              type="button"
              title="Remove Member"
              onClick={() => fields.remove(index)}
            >
              <FontAwesomeIcon
                icon="trash-alt"
              />
            </Button>
          </Col>
        </Row>
      ))}
    </Col>
  </Row>
);


const QuestionListDocuments = (props) => {
  const { activeQuestion, activeDocument } = props;
  const listDocumentFilter = ((activeDocument && activeQuestion.documents) ? activeQuestion.documents.filter(item => item.id !== activeDocument.id) : activeQuestion.documents);

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
      activeQuestion, isFetching, error, activeDocument,
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
        <Form>
          <div className="c-question">
            <Row>
              <Col className="d-flex">
                <Link className="mr-auto btn btn-secondary c-question__btn-back" to="/question-base/1" role="button">
                  <FontAwesomeIcon icon="arrow-circle-left" className="btn__icon" />
                  {' '}
                  Voltar
                </Link>
                <Link className="btn btn-secondary c-question__btn-back" to={`/edit-question/${activeQuestion.id}`}>
                  <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                  {' '}
                  Salvar
                </Link>
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
                      <Row className="c-question__section-list-learning-objects">
                        <Col sm="12" xs="12">
                          {learningObjects.map((learningObject, i) => (
                            <div key={learningObject.id} className="c-question__learning-object">
                              { (learningObject.image) ? (
                                <div>
                                  <img
                                    alt="objeto-aprendizagem"
                                    src={`http://localhost:8000${learningObject.image}`}
                                  />
                                </div>
                              ) : ''}
                              { (learningObject.text) ? (
                                <div className="c-question__learning-object--text">
                                  <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(learningObject.text) }} />
                                </div>
                              ) : ''}
                              { (learningObject.source) ? (
                                <p>
                                  <small>
                                    Fonte:
                                    {' '}
                                    <i>{learningObject.source}</i>
                                  </small>
                                </p>
                              ) : ''}
                            </div>
                          ))}
                        </Col>
                      </Row>
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
                              ? (<div className="c-question__resolution-text" dangerouslySetInnerHTML={{ __html: getCleanAlternativeText(resolution) }} />) : ''
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
                      >
                        { difficultyList && difficultyList.difficulties.map(difficulty => (
                          <option className="c-user-profile__state-city-dropdown-item" key={difficulty.id} value={difficulty.id}>
                            {getTeachingLevel(difficulty.name)}
                          </option>
                        )) }
                      </Field>
                    </Col>
                  </Row>
                  <FieldArray name="topics" component={renderTopics} />
                  
                  {activeQuestion.tags && activeQuestion.tags.length > 0 ? (
                    <Row className="c-question__row-info">
                    <Col className="info-label" sm="4" xs="4">
                      Tags
                    </Col>
                    <Col sm="8" xs="8">
                      <TagList list={activeQuestion.tags} styleTag="question-info  tag-name" />
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
                  Autor
                  </Col>
                    <Col sm="8" xs="8">
                    <QuestionAuthor author={activeQuestion.author} styleTag="question-info author" />
                  </Col>
                  </Row>
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
export default QuestionPage;
