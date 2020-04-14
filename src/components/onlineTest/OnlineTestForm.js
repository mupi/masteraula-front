import React from 'react';

import {
  Alert, Row, Col, Button, Form, Input,
} from 'reactstrap';
import { Link, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Field } from 'redux-form';
import BackUsingHistory from 'components/question/BackUsingHistory';
import {
  requiredValidator,
  minLength3characters,
} from 'helpers/validators';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import moment from 'moment';
import 'moment/locale/pt';

import momentLocalizer from 'react-widgets-moment';

moment.locale('pt');
momentLocalizer();

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD/MM/YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />
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

const OnlineTestForm = (props) => {
  const {
    pristine, handleSubmit,
    submitting, actionName, baseDocument,
  } = props;
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
            <h6>
              {'Derivada da prova: '}
              <strong className="c-online__base-name">{baseDocument.name}</strong>
            </h6>
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
        <Row className="c-create-online__row-info">
          <Col className="info-label" sm="3" xs="3">
            Nome
          </Col>
          <Col sm="9" xs="9">
            <Field
              name="name"
              className="form-control"
              component={renderField}
              validate={[requiredValidator, minLength3characters]}
              label="Insira um nome para o plano de aula"
            />
          </Col>
        </Row>
        <Row className="c-create-online__row-info align-items-center">
          <Col className="info-label" sm="3" xs="3">
            Data início
          </Col>
          <Col sm="3" xs="3">
            <Field
              name="startDate"
              showTime={false}
              component={renderDateTimePicker}
            />
          </Col>
          <Col className="c-create-online__end-date-label" sm="3" xs="3">
            Data fim
          </Col>
          <Col sm="3" xs="3">
            <Field
              name="endDate"
              showTime={false}
              component={renderDateTimePicker}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            { (!pristine && !submitting) ? (
              <Alert color="warning" className="c-online-edit__warning-message">
                  Existem mudanças ainda não salvas na questão
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
  );
};

export default OnlineTestForm;
