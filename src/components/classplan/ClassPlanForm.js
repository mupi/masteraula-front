
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col, Button, Form, Input, Label,
} from 'reactstrap';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import renderMultiselect from 'components/autocomplete/Multiselect';
import { Link, Prompt } from 'react-router-dom';

import { Field } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import ActivityList from 'components/activity/ActivityList';
import DocumentCardList from 'components/document/DocumentCardList';
import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';

import {
  requiredValidator,
  requiredMultiSelectValidator,
  minDuration,
  minLength3characters,
} from 'helpers/validators';

// Document's options available for ClassPlan
const optionsDocument = {
  showViewButton: false,
  removeButton: true,
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
  <>
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
  </>
);

const renderQuestionTextEditor = (props) => {
  const {
    placeholderEditor,
    input: { onChange, value }, disabled, id,
    meta: { touched, error, warning },
  } = props;

  return (
    <div>
      <QuestionTextRichEditor
        id={id}
        disabled={disabled}
        placeholder={placeholderEditor}
        onChange={onChange}
        value={value}
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

export const fieldFile = ({ input, type, meta: { touched, error, warning } }) => {
  const newInput = input;
  delete newInput.value;

  return (
    <div>
      <Label htmlFor={input.name}>
        <Input {...newInput} type={type} placeholder="Carregar pdf" />
      </Label>
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


export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_MODAL_SELECT: 3,
};

class ClassPlanForm extends Component {
    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
      }
    }

    listBnccSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listBnccSuggestions } = this.props;
        listBnccSuggestions(param);
      }
    }

    render() {
      const {
        bnccSuggestions, topicSuggestions, pristine, disciplineFilters, teachingYearFilters,
        teachingLevelFilters, handleSubmit, selectedActivityList, removeSelectedActivityToClassPlan,
        submitting, errorsClassPlan, listTopicSuggestions, listBnccSuggestions, user, showSearchActivityModal,
        showSearchDocumentModal, selectedDocumentList,
        removeSelectedDocumentFromClassPlan, actionName,
      } = this.props;

      return (
        <Form onSubmit={handleSubmit}>
          <Prompt
            when={!pristine && !submitting}
            message={`Tem certeza de sair da tela de ${actionName} Plano de aula?`}
          />
          <div className="c-classplan c-question c-create-question">
            <Row className="c-question__row-header-options c-question__row-header-options--fixed">
              <Col className="c-question__col-header-options">
                <BackUsingHistory disabled={submitting} />
                <Button type="submit" className="btn btn-secondary c-question__btn-back" disabled={submitting}>
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
                  {` ${actionName} Plano de Aula - Aberto`}
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                { (!pristine) ? (
                  <Alert color="warning" className="c-question-edit__warning-message">
                        Existem mudanças ainda não salvas no plano de aula
                  </Alert>
                ) : ''
                        }
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
                    Nome
              </Col>
              <Col sm="8" xs="8">
                <Field
                  name="name"
                  className="form-control"
                  component={renderField}
                  validate={[requiredValidator, minLength3characters]}
                  label="Insira um nome para o plano de aula"
                />
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
                  onChange={this.getListTopics}
                />
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
                  BNCC
              </Col>
              <Col sm="8" xs="8">
                <Field
                  name="bncc"
                  className="form-control"
                  component={renderMultiselect}
                  placeholder="Selecione as habilidades BNCC"
                  data={bnccSuggestions}
                  valueField="id"
                  textField="name"
                  validate={requiredMultiSelectValidator}
                  listBnccSuggestions={listBnccSuggestions}
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
                      Ano
              </Col>
              <Col sm="8" xs="8">
                <Field
                  name="teachingYears"
                  className="form-control"
                  component={renderMultiselect}
                  placeholder="Selecione os anos do nível de ensino"
                  data={teachingYearFilters}
                  valueField="id"
                  textField="name"
                />
              </Col>
            </Row>
            <Row className="c-create-question__row-info">
              <Col className="info-label" sm="4" xs="4">
                      Duração da aula (min)
              </Col>
              <Col sm="2" xs="6">
                <Field
                  className="c-create-question__year-field c-create-question__form-field"
                  name="duration"
                  type="number"
                  component={renderNumericField}
                  label="Ex. 120"
                  validate={minDuration}
                />
              </Col>
            </Row>
            <Row className="c-create-question__row-info">
              <Col className="info-label" sm="4" xs="4">
                   Autoria
              </Col>
              <Col sm="8" xs="8">
                {user.name}
              </Col>
            </Row>
            <Row>
              <Col>
                {errorsClassPlan && errorsClassPlan.general_errors && (
                  <Alert color="danger">
                    {errorsClassPlan.general_errors}
                  </Alert>
                )}
              </Col>
            </Row>
            <Row className="c-question__tittle-section">
              <Col>
                <h5>
                  <FontAwesomeIcon icon="chalkboard-teacher" />
                  {' '}
                  Área do professor
                </h5>
                <div className="border-top my-3" />
              </Col>
            </Row>
            <Row>
              <Col><h6><strong>Etapas</strong></h6></Col>
            </Row>
            <Row className="justify-content-center mb-3">
              <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details">
                <Field
                  component={renderQuestionTextEditor}
                  name="description"
                  key="field"
                  id="descriptionEditorText"
                  disabled={false}
                  placeholderEditor="Escreva as etapas do plano de aula..."
                  validate={requiredValidator}
                  autoFocus
                />
              </Col>
            </Row>
            <Row>
              <Col><h6><strong>Conteúdo para lousa</strong></h6></Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details">
                <Field
                  component={renderQuestionTextEditor}
                  name="content"
                  key="field"
                  id="contentEditorText"
                  disabled={false}
                  placeholderEditor="Insira aqui os conteúdos que você colocará na lousa para os alunos..."
                  autoFocus
                />
              </Col>
            </Row>
            <Row className="c-question__tittle-section">
              <Col>
                <h5>
                  <FontAwesomeIcon icon="user-graduate" />
                  {' '}
                  Área do aluno
                </h5>
                <div className="border-top my-3" />
              </Col>
            </Row>
            <Row>
              <Col><h6><strong>Orientações para o aluno</strong></h6></Col>
            </Row>
            <Row className="justify-content-center mb-3">
              <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details">
                <Field
                  component={renderQuestionTextEditor}
                  name="student_orientations"
                  key="field"
                  id="studentEditorText"
                  disabled={false}
                  placeholderEditor="Insira aqui os conteúdos que você colocará na lousa para os alunos..."
                  autoFocus
                />
              </Col>
            </Row>
            <Row>
              <Col><h6><strong>Materiais para aula</strong></h6></Col>
            </Row>
            <Row className="mb-2">
              <Col sm="12">
                <h6>
                  <FontAwesomeIcon icon="book-reader" />
                  {' '}
                  Atividades
                </h6>
              </Col>
              <Col md="3" sm="6">
                <Button onClick={() => showSearchActivityModal()}>
                  <FontAwesomeIcon
                    icon="plus"
                    className="btn__icon"
                  />
                  Adicionar atividade
                </Button>
              </Col>
            </Row>
            { selectedActivityList ? (
              <ActivityList
                sm="4"
                selectedActivityList={selectedActivityList}
                activities={selectedActivityList}
                removeSelectedActivity={removeSelectedActivityToClassPlan}
                buttonType={BUTTON_TYPE.ACTIVITYCARD_MODAL_SELECT}
                {...this.props}
                showQuantity={false}
                withFilters={false}
              />
            ) : '' }
            <Row className="mt-3">
              <Col sm="12">
                <h6>
                  <FontAwesomeIcon icon="file" />
                  {' '}
                    Provas e/ou Lista de exercícios
                </h6>
              </Col>
              <Col md="3" sm="6">
                <Button onClick={() => showSearchDocumentModal()}>
                  <FontAwesomeIcon
                    icon="plus"
                    className="btn__icon"
                  />
                    Adicionar prova
                </Button>
              </Col>
            </Row>
            { selectedDocumentList ? (
              <DocumentCardList
                selectedDocumentList={selectedDocumentList}
                documents={selectedDocumentList}
                removeSelectedDocument={removeSelectedDocumentFromClassPlan}
                viewOnly={optionsDocument.showViewButton}
              />
            ) : '' }
            <div className="mt-3">

              <Row>
                <Col>
                  { (!pristine) ? (
                    <Alert color="warning" className="c-question-edit__warning-message">
                        Existem mudanças ainda não salvas no plano de aula
                    </Alert>
                  ) : ''
                        }
                </Col>
              </Row>
            </div>
          </div>
          <Row className="c-question__row-footer-options text-center">
            <Col>
              <p>
                <small>
                  {`Ao ${actionName.toLowerCase()} o plano de aula você estará de acordo com os `}
                  <Link target="_blank" to="/terms-use">termos de uso</Link>
                </small>
              </p>
            </Col>
          </Row>

          <Row className="c-question__row-footer-options text-center">
            <Col>
              <Button type="submit" title="Salvar plano de aula" className="btn-secondary btn-margin-right" disabled={submitting}>
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
    }
}
export default ClassPlanForm;
