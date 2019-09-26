import {
  Alert, Row, Col, Button, Form, Input,
} from 'reactstrap';
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';
import DeleteQuestionButtonContainer from 'containers/DeleteQuestionButtonContainer';
import BackUsingHistory from 'components/question/BackUsingHistory';
import { connect } from 'react-redux';
import {
  requiredValidator,
  requiredMultiSelectValidator,
  requiredSelectValidator,
  mustBeNumber, maxYearValue, minLength1Topics, minLength3Alternatives, minLength2TagsForEdit,
} from 'helpers/validators';
import { Field, FieldArray, formValueSelector } from 'redux-form';
import { getTeachingLevel } from 'helpers/question';
import Multiselect from 'react-widgets/lib/Multiselect';
import LearningObjectList from 'components/learningObject/LearningObjectList';

const difficultyList = {
  difficulties: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};

// Basic Input Field
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="text-left">
    <Input
      {...input}
      placeholder={label}
      type={type}
      className="form-control c-create-question__form-field"
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


// Numeric Input Field
const renderNumericField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  className,
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
      className={className}
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

const renderQuestionTextEditor = (props) => {
  const {
    placeholderEditor,
    input: { onChange, value },
    disabled, id,
    meta: { touched, error, warning },
  } = props;

  return (
    <div>
      <QuestionTextRichEditor
        id={id}
        disabled={disabled}
        placeholder={placeholderEditor}
        onChange={onChange}
        value={value || []}
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
};

// Multiselect for Tags field
// touche is not working with multiselectTag
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

const messages = {
  emptyList: 'Não existem resultados',
  emptyFilter: 'Não existem resultados que coincidam',
};

// Multiselect for Disciplines and Teaching Level
const renderMultiselect = ({
  input, data, placeholder, valueField, textField,
  meta: { touched, error, warning },

}) => (
  <div>
    <Multiselect
      {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []}
      data={data}
      valueField={valueField}
      textField={textField}
      placeholder={placeholder}
      messages={messages}
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

// Multiselect
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

const renderAlternatives2 = ({ fields, meta: { error }, resolution }) => (
  <Row>
    <Col md="12">
      <Row className="c-question__row-info c-create-question__row-alternative c-create-question__header-alternative">
        <Col sm="1" xs="1" className="align-self-center hidden-xs">É correta</Col>
        <Col sm="6" xs="9" className="align-self-center hidden-xs">Alternativa</Col>
        <Col sm="2" xs="1" className="align-self-center hidden-xs">Remover</Col>
        { fields.length < 5
          ? (
            <Col sm="3">
              <Button onClick={() => fields.push({})}>
                <FontAwesomeIcon
                  icon="plus"
                  className="btn__icon"
                />
                Adicionar alternativa
              </Button>
            </Col>
          ) : ''}
      </Row>

      {fields.map((alternative, i) => (
        <Row key={i} className="c-question__row-info c-create-question__row-alternative">
          <Col sm="1" xs="1">
            <Field
              name="selectedIndex"
              type="radio"
              component="input"
              normalize={value => parseInt(value, 10)}
              value={i}
              className="c-create-question__radio-button-field"
            />
          </Col>
          <Col sm="6" xs="9">
            <Field
              type="text"
              component={renderField}
              name={`${alternative}.alternativeText`}
              label="Insira sua alternativa"
              validate={resolution && resolution.length > 0 ? null : requiredValidator}
            />
          </Col>
          <Col sm="2" xs="1" className="c-question-edit__col-btn-remove-topic">
            <Button
              type="button"
              title="Remover alternativa"
              className="c-question-edit__btn-remove-topic"
              onClick={() => fields.remove(i)}
            >
              <FontAwesomeIcon
                icon="trash-alt"
              />
            </Button>
          </Col>

        </Row>
      ))}
      <Row>{ error && <span className="error-message-text">{error}</span>}</Row>
    </Col>
  </Row>
);

const RenderAlternatives2 = connect(
  state => ({
    selectedIndex: formValueSelector('edit-question')(state, 'selectedIndex'),
  }),
)(renderAlternatives2);

// Topic section
const renderTopics = ({
  fields, meta: { error }, topicsList, selectedTopics,
}) => (
  <Row>
    <Col md="12">
      <Row className="c-question__row-info c-question-edit__row-topic c-question-edit__header-topic">
        <Col sm="3" className="align-self-center hidden-xs">Assunto</Col>
        <Col sm="3" className="align-self-center hidden-xs">Subassunto</Col>
        <Col sm="3" className="align-self-center hidden-xs">Tópico</Col>
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
      <Row>{error && <span className="error-message-text">{error}</span>}</Row>
    </Col>
  </Row>
);

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: false,
  removeOption: true,
  showTitle: true,
};


class MyQuestionEditPage extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listSourceFilters();
    const { fetchQuestion, match } = this.props;
    fetchQuestion(match.params.id);
    // prepareForm();
  }

  componentDidUpdate(prevProps) {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      const {
        listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
      } = this.props;
      listDisciplineFilters();
      listTeachingLevelFilters();
      listSourceFilters();
      fetchQuestion(id);
    }
  }

    getListTopics = (e, newValue) => {
      const {
        listTopics, resetTopicList,
      } = this.props;
      if (newValue.length > 0) {
        listTopics(newValue);
      } else {
        resetTopicList();
      }
    }

    closeModal() {
      const { hideModal } = this.props;
      hideModal();
    }

    openSearchLearningObjectModal() {
      const { showModal } = this.props;
      // open modal
      showModal({
        open: true,
        closeModal: this.closeModal,
        title: 'Adicionar objeto(s) à questão',
      }, 'searchObjectModal');
    }

    render() {
      const {
        activeQuestion, userId, isFetching, error, topicsList, topics, pristine, disciplineFilters, sourceFilters,
        teachingLevelFilters, handleSubmit, selectedObjectList, removeSelectedObjectToQuestion,
        submitting,
        disciplinesList,
        resolution,
        errors,
      } = this.props;

      const authorPK = activeQuestion && activeQuestion.author ? activeQuestion.author.pk : 'Anônimo';

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
              Questão não disponível para edição
            </Alert>
          </HomeUserPage>
        );
      }


      if (authorPK !== userId) {
        return (
          <HomeUserPage>
            <Alert color="danger">
                Você não tem permissão para editar esta questão.
            </Alert>
          </HomeUserPage> 
        );
      }

      return (
        <HomeUserPage>
          <Form onSubmit={handleSubmit}>
            <div className="c-question c-create-question">
              <Row className="c-question__row-header-options c-question__row-header-options--fixed">
                <Col className="c-question__col-header-options">
                  <BackUsingHistory />
                  <DeleteQuestionButtonContainer
                    questionId={activeQuestion.id}
                    customClass="c-question__btn-remove-question btn__icon"
                    label={(
                      <span>
                        <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
                        Apagar
                      </span>
                      )}
                  />
                  <Button
                    className="btn btn-secondary c-question__btn-back"
                    to="/edit-question/"
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
                    Editar Questão
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col className="c-question__col-full-section-details">
                  <Alert color="warning" className="c-question-edit__warning-message">
                    Você está editando a questão
                    {' '}
                    N°
                    <strong>{activeQuestion.id}</strong>
                    { (!pristine) ? '. Existem mudanças ainda não salvas na questão.' : ''
                    }
                  </Alert>
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col sm="12">
                  <h5>
                    <FontAwesomeIcon icon="image" />
                    {' '}
                  Objetos de aprendizagem
                  </h5>
                </Col>
                <Col sm="3">
                  <Button onClick={() => this.openSearchLearningObjectModal()}>
                    <FontAwesomeIcon
                      icon="plus"
                      className="btn__icon"
                    />
                Adicionar objeto
                  </Button>
                </Col>
              </Row>
              { selectedObjectList ? (
                <LearningObjectList
                  learningObjects={selectedObjectList}
                  options={options}
                  removeSelectedObjectToQuestion={removeSelectedObjectToQuestion}
                />
              ) : '' }
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="pencil-alt" />
                    {' '}
                    Enunciado
                  </h5>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details">
                  <Field
                    component={renderQuestionTextEditor}
                    name="statement"
                    key="field"
                    id="statementEditorText"
                    disabled={false}
                    placeholderEditor="Escreva o enunciado da questão aqui ..."
                    validate={requiredValidator}
                  />
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="check-circle" />
                    {' '}
                    Alternativas
                  </h5>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm="12" md="12" xs="12">
                  <FieldArray
                    name="alternatives"
                    component={RenderAlternatives2}
                    validate={resolution && resolution.length > 0 ? null : minLength3Alternatives}
                    resolution={resolution}
                  />
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="check-double" />
                    {' '}
                    Resolução
                  </h5>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm="12" md="12" xs="12">
                  <Field name="resolution" component={renderField} type="textarea" />
                </Col>
              </Row>
              <div className="question-information">
                <Row className="c-question__tittle-section">
                  <Col>
                    <h5>
                      <FontAwesomeIcon icon="info-circle" />
                      {' '}
                      Informações da Questão
                    </h5>
                  </Col>
                </Row>
                <Row className="c-create-question__row-info">
                  <Col className="info-label" sm="4" xs="4">
                    Ano
                  </Col>
                  <Col sm="8" xs="8">
                    <Field
                      className="c-create-question__year-field c-create-question__form-field"
                      name="year"
                      type="number"
                      component={renderNumericField}
                      label="Ex. 2019"
                      validate={[mustBeNumber, maxYearValue]}
                    />
                  </Col>
                </Row>
                <Row className="c-create-question__row-info">
                  <Col className="info-label" sm="4" xs="4">
                      Vestibular
                  </Col>
                  <Col sm="8" xs="8">
                    <Field
                      name="source"
                      type="text"
                      component={renderSelectField}
                      className="form-control c-create-question__source-field c-create-question__form-field"
                      label="Selecione um vestibular"
                      optionDefault="0"
                    >
                      { sourceFilters && sourceFilters.map(source => (
                        <option className="c-user-profile__state-city-dropdown-item" key={source.id} value={source.name}>
                          {getTeachingLevel(source.name)}
                        </option>
                      )) }
                    </Field>
                  </Col>
                </Row>
                <Row className="c-create-question__row-info">
                  <Col className="info-label" sm="4" xs="4">
                    Disciplinas
                  </Col>
                  <Col sm="8" xs="8">
                    <Field
                      name="disciplines"
                      className="form-control"
                      component={renderMultiselect}
                      placeholder="Insira as discipinas da questão"
                      data={disciplineFilters}
                      valueField="id"
                      textField="name"
                      validate={requiredMultiSelectValidator}
                      onChange={this.getListTopics}
                    />
                  </Col>
                </Row>
                <Row className="c-create-question__row-info">
                  <Col className="info-label" sm="4" xs="4">
                    Nível de Ensino
                  </Col>
                  <Col sm="8" xs="8">
                    <Field
                      name="teachingLevels"
                      className="form-control"
                      component={renderMultiselect}
                      placeholder="Insira o nível de ensino da questão"
                      data={teachingLevelFilters}
                      valueField="id"
                      textField="name"
                      validate={requiredMultiSelectValidator}
                    />
                  </Col>
                </Row>
                <Row className="c-create-question__row-info">
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
                <Row className="c-create-question__row-info">
                  <Col className="info-label" sm="4" xs="4">
                    Grau de dificuldade
                  </Col>
                  <Col sm="8" xs="8">
                    <Field
                      name="difficulty"
                      type="text"
                      component={renderSelectField}
                      label="Selecione um nível de dificuldade"
                      optionDefault="0"
                      className="form-control c-create-question__form-field c-create-question__difficulty-field"
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

                <FieldArray
                  name="topics"
                  component={renderTopics}
                  topicsList={disciplinesList && disciplinesList.length > 0 ? topicsList : null}
                  selectedTopics={topics}
                  validate={minLength1Topics}
                />
                <Row>
                  <Col>
                    { (!pristine) ? (
                      <Alert color="warning" className="c-question-edit__warning-message">
                        Existem mudanças ainda não salvas na questão
                      </Alert>
                    ) : ''
                        }
                  </Col>
                </Row>
              </div>
            </div>
            <Row className="c-questions__row-footer-options text-center">
              <Col>
                {errors && <strong>{errors.isCorrect}</strong>}

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
export default MyQuestionEditPage;
