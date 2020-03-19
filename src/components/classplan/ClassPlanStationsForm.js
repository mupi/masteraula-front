
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col, Button, Form, Input, Label,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import renderMultiselect from 'components/autocomplete/Multiselect';
import { Link, Prompt } from 'react-router-dom';

import { Field, FieldArray } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  requiredValidator,
  requiredMultiSelectValidator,
  minDuration,
  minLength3characters,
  linkValidator,
  minLength2Stations,
} from 'helpers/validators';

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


const renderStations = ({ fields, meta: { error } }) => (
  <>
    <div className="mb-2">
      { fields.length < 5
        ? (
          <Button onClick={() => fields.push({})}>
            <FontAwesomeIcon
              icon="plus"
              className="btn__icon"
            />
              Adicionar estação
          </Button>
        ) : ''}
    </div>

    {fields.map((station, i) => (
      <>
        <Row>
          <Col sm="12" className="c-classplan__col-link-text">
            <h6>{`Estação ${i + 1}`}</h6>
          </Col>
        </Row>
        <Row key={`${station}.id`} className="mb-3 align-items-center">
          <Col sm="8" xs="9" className="c-classplan__col-link-text">
            <Field
              type="textarea"
              component={renderField}
              name={`${station}.description`}
              label="Insira uma descrição"
              validate={requiredValidator}
            />
          </Col>
          <Col sm="3" xs="9" className="text-center">
            <UncontrolledDropdown>
              <DropdownToggle title="Mais ações" className="c-my-classplans__toggle">
                <FontAwesomeIcon icon="plus" />
                {' '}
                Material
              </DropdownToggle>
              <DropdownMenu className="label-item__dropdown-menu" right>
                <DropdownItem
                  title="Adicionar questão à estação"
                >
                  <FontAwesomeIcon icon="book" />
                  {' '}
                  Questão
                </DropdownItem>
                <DropdownItem divider className="label-item__divider" />
                <DropdownItem
                  title="Adicionar objeto à estação"
                >
                  <FontAwesomeIcon icon="image" />
                  {' '}
                  Objeto de aprendizagem
                </DropdownItem>
                <DropdownItem divider className="label-item__divider" />
                <DropdownItem
                  title="Adicionar prova à estação"
                >
                  <FontAwesomeIcon icon="file-alt" />
                  {' '}
                  Prova
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col sm="1" xs="1" className="c-classplan__col-btn-remove-link">
            <Button
              type="button"
              title="Remover estação"
              className="c-classplan__btn-remove-link"
              onClick={() => fields.remove(i)}
            >
              <FontAwesomeIcon
                icon="trash-alt"
              />
            </Button>
          </Col>

        </Row>
      </>
    ))}
    <Row>{ error && <span className="error-message-text">{error}</span>}</Row>
  </>
);

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

class ClassPlanStationsForm extends Component {
    listTopicSuggestions = (param) => {
      if (param && param.length === 3) {
        const { listTopicSuggestions } = this.props;
        listTopicSuggestions(param);
      }
    }

    render() {
      const {
        topicSuggestions, pristine, disciplineFilters, teachingYearFilters,
        teachingLevelFilters, handleSubmit,
        submitting, errorsClassPlan, listTopicSuggestions, user, actionName,
      } = this.props;

      return (
        <Form onSubmit={handleSubmit}>
          <Prompt
            when={!pristine && !submitting}
            message={`Tem certeza de sair da tela de ${actionName} Plano de aula?`}
          />
          <div className="c-question c-create-question">
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
                  {` ${actionName} Plano de Aula - Rotação por Estações` }
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
                  <FontAwesomeIcon icon="sync-alt" />
                  {' '}
                    Estações
                </h5>
                <div className="border-top my-3" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm="12">
                <FieldArray
                  name="stations"
                  component={renderStations}
                  validate={minLength2Stations}
                />
              </Col>
            </Row>

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
                <div className="small-text ">
                    Tamanho máximo 2 MB.
                </div>
                <Field
                  component={fieldFile}
                  type="file"
                  name="pdf"
                  id="pdf"
                  className="form-control"
                />
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
export default ClassPlanStationsForm;
