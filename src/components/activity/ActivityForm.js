import React from 'react';

import {
  Alert, Row, Col, Button, Form, Input,
} from 'reactstrap';
import { Link, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderMultiselect from 'components/autocomplete/Multiselect';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import { getTeachingLevel } from 'helpers/question';

import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';

import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  requiredMultiSelectValidator,
  requiredSelectValidator,
  minLength1Tasks,
  requiredValidator,
} from 'helpers/validators';

import { Field, FieldArray } from 'redux-form';

const difficultyList = {
  difficulties: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};

// Learning object's options available for LearnningObjectContent
const options = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: false,
  removeOption: true,
  showTitle: true,
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

// Multiselect for Source
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


export const renderTasks = ({
  fields, meta: { error },
  addTaskToActivity, removeTaskFromActivity,
}) => (
  <>
    <div className="mb-2">
      { fields.length < 5
        ? (
          <Button onClick={() => { fields.push({}); addTaskToActivity({}); }}>
            <FontAwesomeIcon
              icon="plus"
              className="btn__icon"
            />
              Adicionar tarefa
          </Button>
        ) : ''}
    </div>

    <div className="c-classplan__stations">
      {fields.map((task, i) => (
        <div key={`${task}.id`} className="c-classplan__view-station border-bottom my-3">
          <Row className="mb-1 align-items-center">
            <Col sm="6" xs="6" className="c-classplan__col-link-text">
              <h6><strong>{`Tarefa ${i + 1}`}</strong></h6>
            </Col>
            <Col sm="6" xs="6" className="text-right">
              <Button
                type="button"
                title="Remover tarefa"
                className="c-classplan__btn-remove-link"
                onClick={() => { fields.remove(i); removeTaskFromActivity(i); }}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                />
              </Button>
            </Col>
          </Row>
          <Row className="mb-3 align-items-center">
            <Col sm="12" className="c-classplan__col-link-text mb-2">
              Descrição da tarefa (para o aluno)
              <Field
                type="textarea"
                component={renderField}
                name={`${task}.description_task`}
                label="Ex. Assista ao vídeo e faça uma síntese em seu caderno."
                validate={requiredValidator}
              />
            </Col>
            <Col sm="12" className="c-classplan__col-link-text mb-2">
              Expectativas para o papel do aluno
              <Field
                type="textarea"
                component={renderField}
                name={`${task}.student_expectation`}
                label="Ex. Assistir ao vídeo e registrar ..."
                validate={requiredValidator}
              />
            </Col>
            <Col sm="12" className="c-classplan__col-link-text mb-2">
              Comentários para uso do professor
              <Field
                type="textarea"
                component={renderField}
                name={`${task}.teacher_expectation`}
                label="Ex. Validar a síntese no caderno do aluno"
              />
            </Col>
          </Row>
        </div>
      ))}
    </div>
    <Row>{ error && <span className="error-message-text">{error}</span>}</Row>
  </>
);
const ActivityForm = (props) => {
  const {
    topicSuggestions, pristine, disciplineFilters,
    teachingLevelFilters, handleSubmit, selectedObjectList, removeSelectedObjectFromActivity,
    submitting, errors, listTopicSuggestions, showSearchLearningObjectModal,
    addTaskToActivity, removeTaskFromActivity,
    tasks,
    actionName,
  } = props;
  return (

    <Form onSubmit={handleSubmit}>
      <Prompt
        when={!pristine && !submitting}
        message={`Tem certeza de sair da tela de ${actionName} atividade?`}
      />
      <div className="c-online c-create-online">
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory disabled={submitting} />
            <Button className="btn btn-secondary c-online__btn-back" type="submit" disabled={submitting}>
              <FontAwesomeIcon
                className="btn__icon"
                icon="save"
              />
              {' '}
                  Salvar
            </Button>
          </Col>
        </Row>
        <Row className="c-online__tittle-section c-online--space-for-title">
          <Col>
            <h4>
              <FontAwesomeIcon icon="book-reader" />
              {` ${actionName} atividade`}
            </h4>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm="12">
            <h5>
              <FontAwesomeIcon icon="image" />
              {' '}
              Objetos de aprendizagem
            </h5>
            <div className="border-top my-3" />

          </Col>
          <Col md="3" sm="6">
            <Button onClick={() => showSearchLearningObjectModal()}>
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
            removeSelectedObject={removeSelectedObjectFromActivity}
          />
        ) : '' }
        <Row className="c-question__tittle-section">
          <Col>
            <h5>
              <FontAwesomeIcon icon="user-edit" />
              {' '}
              Tarefas
            </h5>
            <div className="border-top my-3" />

          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm="12">
            <FieldArray
              name="tasks"
              component={renderTasks}
              validate={minLength1Tasks}
              tasks={tasks}
              addTaskToActivity={addTaskToActivity}
              removeTaskFromActivity={removeTaskFromActivity}
            />
          </Col>
        </Row>
        <Row className="c-question__tittle-section">
          <Col>
            <h5>
              <FontAwesomeIcon icon="info-circle" />
              {' '}
              Informações básicas
            </h5>
            <div className="border-top my-3" />

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
              placeholder="Insira as discipinas do plano de aula"
              data={disciplineFilters}
              valueField="id"
              textField="name"
              validate={requiredMultiSelectValidator}
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
              placeholder="Insira o nível de ensino do plano de aula"
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
        <Row className="c-create-question__row-info">
          <Col className="info-label" sm="4" xs="4">
                      Tópicos
          </Col>
          <Col sm="8" xs="8">
            <Field
              name="topics"
              className="form-control"
              component={renderMultiselect}
              placeholder="Selecione os tópicos"
              data={topicSuggestions}
              valueField="id"
              textField="name"
              validate={requiredMultiSelectValidator}
              listTopicSuggestions={listTopicSuggestions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {errors && errors.general_errors && !submitting && (
            <Alert color="danger">
              {errors.general_errors}
            </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            { (!pristine && !submitting) ? (
              <Alert color="warning" className="c-online-edit__warning-message">
                      Existem mudanças ainda não salvas na atividade
              </Alert>
            ) : ''
                          }
          </Col>
        </Row>
      </div>
      <Row className="c-online__row-footer-options text-center">
        <Col>
          <p>
            <small>
              {`Ao ${actionName.toLowerCase()} a atividade você estará de acordo com os `}
              {' '}
              <Link target="_blank" to="/terms-use">termos de uso</Link>
            </small>
          </p>
        </Col>
      </Row>

      <Row className="c-online__row-footer-options text-center">
        <Col>
          <Button type="submit" title="Salvar atividade" className="btn-secondary btn-margin-right" disabled={submitting}>
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
  );
};

export default ActivityForm;
