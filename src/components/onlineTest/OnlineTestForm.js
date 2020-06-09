import React from 'react';

import {
  Alert, Row, Col, Button, Form, Input, Label, FormGroup, Badge,
} from 'reactstrap';
import { Link, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Field, FieldArray } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  requiredValidator,
  minLength3characters,
  minDuration,
  maxNumDigits,
} from 'helpers/validators';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import moment from 'moment';
import 'moment/locale/pt';

import momentLocalizer from 'react-widgets-moment';
import { getCleanExtractStatement } from 'helpers/question';

import URLCopy from 'components/onlineTest/URLCopy';
import { masteraulaUrl } from 'helpers/config';

moment.locale('pt');
momentLocalizer();

const renderDateTimePicker = ({
  input: { onChange, value }, showTime, placeholder, meta: { touched, error, warning },
}) => (

  <div className="text-left">
    <DateTimePicker
      onChange={onChange}
      format="DD/MM/YYYY"
      time={showTime}
      value={!value ? null : new Date(value)}
      placeholder={placeholder}
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
      className="form-control c-create-online__form-field"
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

/* eslint-disable react/no-array-index-key */
const renderQuestions = ({
  fields, questions, showQuestionModal, isEditable = false,
}) => (
  <>
    {fields && fields.map((questionField, i) => {
      const autorship = questions[i].question && questions[i].question.authorship
        ? questions[i].question.authorship : questions[i].question.author.name;

      const extractStatement = getCleanExtractStatement(questions[i].question.statement);

      return (
        <div className="c-document__question" key={questions[i].question.id}>
          {questions[i].question.statement && (
          <Row>
            <Col sm="8" className="c-document__question-image">
              {questions[i].question.disabled && (
                <Alert color="danger" className="c-document__question-unavailable">
                  A questão não está mais disponível no Banco de Questões.
                </Alert>
              )}
              <p className="c-document__question-info-title">
                {`Questão N° ${questions[i].question.id} `}
                {questions[i].question.learning_objects && questions[i].question.learning_objects.length > 0 ? (
                  <span className="c-document__question-number-learning-obj">
                    (
                    {' '}
                    <FontAwesomeIcon icon="image" />
                    {` ${questions[i].question.learning_objects.length}`}
                    )
                  </span>
                ) : ''}
                :
              </p>
              <p className="c-document__question-info-statement">
                { (extractStatement.length >= 350) ? ` ${extractStatement.substring(0, 350)} ...` : extractStatement}
              </p>
              {(questions[i].question.tags || questions[i].question.all_topics)
                && (questions[i].question.tags.length > 0 || questions[i].question.all_topics.length > 0) ? (
                  <p className="c-document__question-info-row-topics">
                    {questions[i].question.tags.concat(questions[i].question.all_topics).map((tag, x) => <Badge key={`${questions[i].question.id}-${x}`} color="success" pill>{tag.name.trim()}</Badge>)}
                  </p>
                ) : ''}

              <Row form>
                <Col md={6} xs="12">
                  { isEditable && (
                    <FormGroup check inline>
                      <Label for="score" className="c-online__score-label" style={{ marginRight: '7px' }}><strong>Pontuação: </strong></Label>
                      <Field
                        name={`${questionField}.score`}
                        type="number"
                        component={renderNumericField}
                        placeholder="Ex. 5.5"
                        validate={[minDuration, maxNumDigits]}
                      />
                    </FormGroup>
                  )}
                  { !isEditable && questions[i].score && (
                    <>
                      <span className="c-online__score-label" style={{ marginRight: '7px' }}>
                        <strong>
                          Pontuação:
                          {' '}
                        </strong>
                      </span>
                      <span>
                        {questions[i].score}
                      </span>
                    </>
                  ) }
                </Col>
              </Row>
            </Col>
            <Col sm="4" className="c-document__question-info">
              <Row>
                <Col sm="12">
                  <p className="c-document__question-info-subtitle">
                    Informações:
                  </p>
                </Col>
                <Col sm="12">
                  <p className="c-document__question-info-row">
                    {'Tipo: '}
                    <span className="c-document__question-info-detail">{questions[i].question.type_question}</span>
                  </p>
                  {!questions[i].question.source
                    ? (
                      <p className="c-document__question-info-row">
                        {'Autoria: '}
                        <span className="c-document__question-info-detail">{autorship}</span>
                      </p>
                    ) : (
                      <>
                        {questions[i].question.source && (
                        <p className="c-document__question-info-row">
                          {'Vestibular: '}
                          <span className="c-document__question-info-detail">{questions[i].question.source}</span>
                        </p>
                        )}
                        {questions[i].question.year && (
                        <p className="c-document__question-info-row">
                          {'Ano: '}
                          <span className="c-document__question-info-detail">{questions[i].question.year}</span>
                        </p>
                        )}
                      </>
                    )
                  }
                  <p className="c-document__question-info-row">
                    {'Níveis de Ensino: '}
                    {questions[i].question.teaching_levels && questions[i].question.teaching_levels.map(level => (
                      <span key={level.id} className="c-document__question-info-detail">
                        {level.name}
                      </span>
                    ))}
                  </p>
                  <p className="c-document__question-info-row">
                    {'Disciplinas: '}
                    <i>{questions[i].question.disciplines && questions[i].question.disciplines.map(discipline => (discipline.name.trim())).join(', ')}</i>
                  </p>
                </Col>
              </Row>
              <Row>
                <div className="c-document__question-view-more col-md-12">
                  <Button onClick={() => showQuestionModal(questions[i].question.id)}>
                    <FontAwesomeIcon icon="search" />
                    {' '}
                    <span className="button-text">
                        Ver questão
                    </span>
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
          )}
        </div>
      );
    })}

  </>
);

const OnlineTestForm = (props) => {
  const {
    pristine, handleSubmit,
    submitting, actionName, baseDoc, onlineTest,
    typeDurationSelected,
    totalScore,
    showQuestionModal,
  } = props;

  const questions = actionName === 'Criar' ? baseDoc.questions : onlineTest.questions_document;
  const isEditable = actionName === 'Criar';
  return (

    <Form onSubmit={handleSubmit}>
      <Prompt
        when={!pristine && !submitting}
        message={`Tem certeza de sair da tela de ${actionName} prova online?`}
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
              <FontAwesomeIcon icon="laptop" />
              {` ${actionName} prova online`}
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{baseDoc.name}</strong>
            </p>
          </Col>
        </Row>
        <Row className="c-online__tittle-section">
          <Col>
            <h5>
                Configurações básicas
            </h5>
            <div className="border-top my-3" />

          </Col>
        </Row>

        { !isEditable && (
        <Row className="justify-content-end">
          <Col sm="6">
            <URLCopy url={`${masteraulaUrl}/apply-online/${onlineTest.link}`} />
          </Col>
        </Row>
        )}
        <Row className="c-create-online__row-info">
          <Col sm="12" xs="12">
            <Label for="name">Nome</Label>
            <Field
              name="name"
              className="form-control"
              component={renderField}
              validate={[requiredValidator, minLength3characters]}
              label="Insira um nome para a prova online"
            />
          </Col>
        </Row>
        <Row className="c-create-online__row-info align-items-center">
          <Col sm="6">
            <Row form>
              <Col sm="12">
                <Label>
                  {'Periodo ativo da prova '}
                </Label>
                <FontAwesomeIcon
                  className="btn__icon-right"
                  icon="question-circle"
                  title="Disponibilidade da prova para os alunos"
                />
              </Col>
            </Row>
            <Row form className="align-items-center">
              <Col sm="4" xs="4">
                <Field
                  name="start_date"
                  showTime={false}
                  component={renderDateTimePicker}
                  validate={requiredValidator}
                  placeholder="dd/mm/aaaa"
                />
              </Col>
              <Col className="text-center" sm="4" xs="4">
              até
              </Col>
              <Col sm="4" xs="4">
                <Field
                  name="finish_date"
                  showTime={false}
                  component={renderDateTimePicker}
                  validate={requiredValidator}
                  placeholder="dd/mm/aaaa"
                />
              </Col>
            </Row>
          </Col>
          <Col sm="6">
            <Row form>
              <Col sm="12">
                <Label>
                  {'Duração da prova livre ou restrita?'}
                </Label>
                <FontAwesomeIcon
                  className="btn__icon-right"
                  icon="question-circle"
                  title="Tempo disponível para resolver a prova"
                />
              </Col>
            </Row>
            <Row form className="align-items-center">
              <Col sm="3" xs="3">
                <FormGroup check inline>
                  <Label check>
                    <Field
                      name="typeDuration"
                      component="input"
                      type="radio"
                      value="L"
                      className="c-create-online__radio-button-field"
                    />
                    {' '}
                    Livre
                  </Label>
                </FormGroup>
              </Col>
              <Col sm="6" xs="9">
                <FormGroup check inline>
                  <Label check>
                    <Field
                      name="typeDuration"
                      component="input"
                      type="radio"
                      value="R"
                      className="c-create-online__radio-button-field"
                    />
                    {' '}
                    Restrita
                  </Label>
                  {typeDurationSelected === 'R'
                  && (
                    <>
                      <Field
                        className="c-create-online__duration c-create-online__form-field"
                        name="duration"
                        type="number"
                        component={renderNumericField}
                        label="Ex. 120"
                        validate={[minDuration, requiredValidator]}
                      />
                      <span style={{ marginLeft: '5px' }}>min</span>
                    </>
                  )
                  }
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="c-online__tittle-section">
          <Col>
            <h5>
              Questões:
            </h5>
            <div className="border-top my-3" />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="c-online__total-questions-label">
              <strong>{`Total de ${questions.length} questões`}</strong>
            </p>
            <p className="c-online__questions-info">
              <span className="c-online__questions-info--label">
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="image"
                />
                <strong>Mídia: </strong>
              </span>
              { onlineTest.media_questions && (
              <span className="c-online__questions-info--value">
                { `${onlineTest.media_questions} objetos de aprendizagem`}
              </span>
              )}
            </p>
            <p className="c-online__questions-info">
              <span className="c-online__questions-info--label">
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="check-square"
                />
                <strong>Tipos de questões: </strong>
              </span>
              { onlineTest.types_questions && (
              <span className="c-online__questions-info--value">
                { `${onlineTest.types_questions.dissertation_quantity} dissertativas / `}
                { `${onlineTest.types_questions.objective_quantity} multipla escolha`}
              </span>
              )}
            </p>
            <p className="c-online__questions-info">
              <span className="c-online__questions-info--label">
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="graduation-cap"
                />
                <strong>Aplicação: </strong>
              </span>
              { onlineTest.application && (
              <span className="c-online__questions-info--value">
                { `${onlineTest.application.exam_quantity} questões de vestibular / `}
                { `${onlineTest.application.authoral_quantity} questão autoral`}
              </span>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ marginBottom: '0px' }}>
              <span className="c-create-online__total-score-label"><strong>Pontuação total: </strong></span>
              {totalScore}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FieldArray
              name="questions_document"
              component={renderQuestions}
              questions={questions}
              showQuestionModal={showQuestionModal}
              isEditable={isEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ marginBottom: '0px' }}>
              <span className="c-create-online__total-score-label"><strong>Pontuação total: </strong></span>
              {totalScore}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            { (!pristine && !submitting) ? (
              <Alert color="warning" className="c-online-edit__warning-message">
                  Existem mudanças ainda não salvas na prova online
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
              {`Ao ${actionName.toLowerCase()} a prova online você estará de acordo com os `}
              {' '}
              <Link target="_blank" to="/terms-use">termos de uso</Link>
            </small>
          </p>
        </Col>
      </Row>

      <Row className="c-online__row-footer-options text-center">
        <Col>
          <Button type="submit" title="Salvar prova online" className="btn-secondary btn-margin-right" disabled={submitting}>
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

export default OnlineTestForm;
