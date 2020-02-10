
import React, { Component } from 'react';
import HomeUserPage from 'pages/HomeUser/HomeUserPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col, Button, Form, Input,
} from 'reactstrap';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import renderMultiselect from 'components/autocomplete/Multiselect';
import { Link } from 'react-router-dom';

import { Field, FieldArray } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import LearningObjectList from 'components/learningObject/LearningObjectList';
import DocumentCardListClassPlan from 'components/document/DocumentCardListClassPlan';
import {
  requiredValidator,
  requiredMultiSelectValidator,
  mustBeNumber, maxYearValue,
  minLength3characters,
  linkValidator,
} from 'helpers/validators';

// Learning object's options available for LearnningObjectContent
const optionsObject = {
  showOperations: true,
  showViewButton: true,
  showCreateQuestionButton: false,
  removeOption: true,
  showTitle: true,
};


// Document's options available for Create ClassPlan
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


const renderLinks = ({ fields, meta: { error } }) => (
  <>
    <div className="mb-2">
      <Button onClick={() => fields.push({})}>
        <FontAwesomeIcon
          icon="plus"
          className="btn__icon"
        />
      Adicionar Link
      </Button>
    </div>

    {fields.map((link, i) => (
      <Row key={`${link}.id`} className="mb-1">
        <Col sm="6" xs="9" className="c-classplan__col-link-text">
          <Field
            type="text"
            component={renderField}
            name={`${link}.link`}
            label="Insira uma url"
            validate={[linkValidator, requiredValidator]}
          />
        </Col>
        <Col sm="5" xs="9">
          <Field
            type="text"
            component={renderField}
            name={`${link}.description_url`}
            label="Insira uma descrição"
          />
        </Col>
        <Col sm="1" xs="1" className="c-classplan__col-btn-remove-link">
          <Button
            type="button"
            title="Remover link"
            className="c-classplan__btn-remove-link"
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
  </>
);

class EditClassPlanPage extends Component {
  componentDidMount() {
    const {
      listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters,
    } = this.props;
    listDisciplineFilters();
    listTeachingLevelFilters();
    listTeachingYearFilters();
    const { fetchClassPlan, match } = this.props;
    fetchClassPlan(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { fetchClassPlan, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      const {
        listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
      } = this.props;
      listDisciplineFilters();
      listTeachingLevelFilters();
      listSourceFilters();
      fetchClassPlan(id);
    }
  }

    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
      }
    }

    render() {
      const {
        isFetching, error, topicSuggestions, pristine, disciplineFilters, teachingYearFilters,
        teachingLevelFilters, handleSubmit, selectedObjectList, removeSelectedObjectToClassPlan,
        submitting, errorsUpdateClassPlan, listTopicSuggestions, user, showSearchLearningObjectModal,
        showSearchDocumentModal, selectedDocumentList,
        removeSelectedDocumentFromClassPlan, activeClassPlan, userId,
      } = this.props;

      const authorPK = (activeClassPlan && activeClassPlan.owner) ? activeClassPlan.owner.pk : 'Anônimo';
      const isOwner = (authorPK === userId);

      if (isFetching) {
        return (
          <HomeUserPage>
            <Alert className="alert--warning" color="warning">
                Carregando ...
            </Alert>
          </HomeUserPage>
        );
      }

      if (!isOwner) {
        return (
          <HomeUserPage>
            <Alert color="danger">
              Você não tem permissão para editar este plano de aula.
            </Alert>
          </HomeUserPage>
        );
      }

      if (error || !activeClassPlan) {
        return (
          <HomeUserPage>
            <Alert color="danger">
                Erro no plano de aula
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
                  <Button className="btn btn-secondary c-question__btn-back" type="submit" disabled={submitting}>
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
                    Editar Plano de Aula
                  </h4>
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
                    validate={[mustBeNumber, maxYearValue]}
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
                  {errorsUpdateClassPlan && errorsUpdateClassPlan.general_errors && (
                  <Alert color="danger">
                    {errorsUpdateClassPlan.general_errors}
                  </Alert>
                  )}
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="pencil-alt" />
                    {' '}
                    Etapas
                  </h5>
                  <div className="border-top my-3" />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details">
                  <Field
                    component={renderQuestionTextEditor}
                    name="description"
                    key="field"
                    id="statementEditorText"
                    disabled={false}
                    placeholderEditor="Escreva as etapas do plano de aula..."
                    validate={requiredValidator}
                    autoFocus
                  />
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="book" />
                    {' '}
                    Materias a serem usados
                  </h5>
                  <div className="border-top my-3" />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="12">
                  <h6>
                    <FontAwesomeIcon icon="image" />
                    {' '}
                    Objetos de aprendizagem
                  </h6>
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
                  options={optionsObject}
                  removeSelectedObject={removeSelectedObjectToClassPlan}
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
                <DocumentCardListClassPlan
                  documents={selectedDocumentList}
                  options={optionsDocument}
                  removeSelectedDocument={removeSelectedDocumentFromClassPlan}
                />
              ) : '' }
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="link" />
                    {' '}
                    Recursos Extras
                  </h5>
                  <div className="border-top my-3" />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="12">
                  <h6>
                    <FontAwesomeIcon icon="file-pdf" />
                    {' '}
                    Arquivo PDF
                  </h6>
                </Col>
                <Col md="3" sm="6">
                  <Button onClick={() => showSearchLearningObjectModal()}>
                    <FontAwesomeIcon
                      icon="plus"
                      className="btn__icon"
                    />
                    Selecionar arquivo
                  </Button>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="12">
                  <h6>
                    <FontAwesomeIcon icon="link" />
                    {' '}
                    Adicione seus links
                  </h6>
                </Col>

                <Col sm="12">

                  <FieldArray
                    name="links"
                    component={renderLinks}
                  />
                </Col>
              </Row>
              <Row className="c-question__tittle-section">
                <Col>
                  <h5>
                    <FontAwesomeIcon icon="comments" />
                    {' '}
                    Comentários do autor
                  </h5>
                  <div className="border-top my-3" />
                </Col>
              </Row>

              <Row className="c-create-question__row-info">
                <Col sm="12" xs="12">
                  <Field
                    name="comment"
                    className="form-control"
                    component={renderField}
                    label="Insira seus comentários"
                    type="textarea"
                  />
                </Col>
              </Row>
              <div className="question-information">

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
            <Row className="c-question__row-footer-options text-center">
              <Col>
                <p>
                  <small>
                    Ao criar o plano de aula você estará de acordo com os
                    {' '}
                    <Link target="_blank" to="/terms-use">termos de uso</Link>
                  </small>
                </p>
              </Col>
            </Row>

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
export default EditClassPlanPage;
