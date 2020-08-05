
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert, Row, Col, Button, Form, Input, Label,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';
import renderMultiselect from 'components/autocomplete/Multiselect';
import { Link, Prompt } from 'react-router-dom';
import DocumentCard from 'components/document/DocumentCard';
import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';
import ActivityCard from '../activity/ActivityCard';

import { Field, FieldArray } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  requiredValidator,
  requiredMultiSelectValidator,
  minDuration,
  minLength3characters,
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

/*
typeMaterial
D = Document
O = Objeto
Q = Question
*/
const handleRemoveMateriaButton = (e, stationIndex, typeMaterial, removeMaterialFromClassPlanStation) => {
  e.preventDefault();
  removeMaterialFromClassPlanStation(stationIndex, typeMaterial);
};

const optionsFieldDocumentCard = {
  showViewButton: true,
  removeOption: false,
  showTags: false,
  showLoginModal: false,
};

const StationMaterial = ({ station, stationIndex, removeMaterialFromClassPlanStation }) => {
  const StationMaterialRemoveButton = typeMaterial => (
    <Button color="danger" onClick={e => handleRemoveMateriaButton(e, stationIndex, typeMaterial, removeMaterialFromClassPlanStation)}>
      <FontAwesomeIcon icon="trash-alt" className="btn__icon" />
      {' '}
      Remover
    </Button>
  );

  return (
    <div>
      {station.document_ids && station.material && (
      <DocumentCard
        document={station.material}
        button={StationMaterialRemoveButton('D')}
        options={optionsFieldDocumentCard}
      />
      )}
      {station.activity_ids  && station.material && (
        <ActivityCard 
        activity={station.material}
        button={StationMaterialRemoveButton('A')} 
        />
      )}
      {/* {station.document_online_ids  && station.material && (
      <DocumentOnlineCard
        document_online={station.material}
        button={StationMaterialRemoveButton('O')}
      />
      )} */}
    </div>
  );
};

export const renderStations = ({
  fields, meta: { error },
  showSearchDocumentModal, showSearchActivityModal,
  stations,
  addStationToClassPlan, removeStationFromClassPlan,
  removeMaterialFromClassPlanStation,
}) => (
  <>
    <div className="mb-2">
      { fields.length < 5
        ? (
          <Button onClick={() => { fields.push({}); addStationToClassPlan({ activity_ids: '', document_ids: '', document_online_ids: '' }); }}>
            <FontAwesomeIcon
              icon="plus"
              className="btn__icon"
            />
              Adicionar estação
          </Button>
        ) : ''}
    </div>

    <div className="c-classplan__stations">
      {fields.map((station, i) => (
        <div key={`${station}.id`} className="c-classplan__view-station border-bottom my-3">
          <Row>
            <Col sm="12" className="c-classplan__col-link-text">
              <h6>{`Estação ${i + 1}`}</h6>
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col>
                Nome:
            </Col>
            <Col sm="9" md="10" xs="9">
              <Field
                name={`${station}.name_station`}
                className="form-control"
                component={renderField}
                validate={[requiredValidator, minLength3characters]}
                label="Insira um nome para o plano de aula"
              />
            </Col>
            <Col className="c-classplan__col-btn-remove-link text-right">
              <Button
                type="button"
                title="Remover estação"
                className="c-classplan__btn-remove-link"
                onClick={() => { fields.remove(i); removeStationFromClassPlan(i); }}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                />
              </Button>
            </Col>
            </Row>
          <Row className="mb-3 align-items-center">
            <Col><h6><strong>Etapas</strong></h6></Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col sm="9" md="9" xs="9" className="c-question__col-full-section-details">
              <Field
                component={renderQuestionTextEditor}
                name={`${station}.description_station`}
                key="field"
                id="descriptionEditorText"
                disabled={false}
                placeholderEditor="Descreva aqui as orientações que seus alunos lerão sobre essa estação"
                validate={requiredValidator}
                autoFocus
              />
            </Col>
            <Col sm="3" xs="9" className="text-center">
              {stations && stations.length > 0 && (!stations[i] || (!stations[i].material)) ? (
                <UncontrolledDropdown>
                  <DropdownToggle title="Adicionar material" className="c-my-classplans__toggle">
                    <FontAwesomeIcon icon="plus" />
                    {' '}
                    Material
                  </DropdownToggle>
                  <DropdownMenu className="label-item__dropdown-menu" right>
                    <DropdownItem
                      title="Adicionar atividade à estação"
                      onClick={() => showSearchActivityModal(true, i)}
                    >
                      <FontAwesomeIcon icon="book-reader" />
                      {' '}
                      Atividade
                    </DropdownItem>
                    <DropdownItem divider className="label-item__divider" />
                    <DropdownItem
                      title="Adicionar prova à estação"
                      onClick={() => showSearchDocumentModal(true, i)}
                    >
                      <FontAwesomeIcon icon="file-alt" />
                      {' '}
                      Prova
                    </DropdownItem>
                    <DropdownItem divider className="label-item__divider" />
                    <DropdownItem
                      title="Adicionar prova online à estação"
                      onClick={() => showSearchDocumentModal(true, i)}
                    >
                      <FontAwesomeIcon icon="laptop" />
                      {' '}
                    Prova Online
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : <StationMaterial station={stations[i]} stationIndex={i} removeMaterialFromClassPlanStation={removeMaterialFromClassPlanStation} />}
            </Col>
          </Row>
        </div>
      ))}
    </div>
    <Row>{ error && <span className="error-message-text">{error}</span>}</Row>
  </>
);

class ClassPlanStationsForm extends Component {
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
        teachingLevelFilters, handleSubmit,
        submitting, errorsClassPlan, listTopicSuggestions, listBnccSuggestions, 
        user, showSearchActivityModal, actionName,
        showSearchDocumentModal, stations, addStationToClassPlan, removeStationFromClassPlan,
        removeMaterialFromClassPlanStation,
      } = this.props;

      // const { stations } = this.state;

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
              <Col className="info-label">
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
                  listBnccSuggestions={listBnccSuggestions}                />
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
                  name="phases"
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
                  showSearchActivityModal={showSearchActivityModal}
                  showSearchDocumentModal={showSearchDocumentModal}
                  stations={stations}
                  addStationToClassPlan={addStationToClassPlan}
                  removeStationFromClassPlan={removeStationFromClassPlan}
                  removeMaterialFromClassPlanStation={removeMaterialFromClassPlanStation}
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
