import React from 'react';

import {
  Alert, Row, Col, Button, Form,
} from 'reactstrap';
import { Link, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackUsingHistory from 'components/question/BackUsingHistory';

import { Field, FieldArray } from 'redux-form';

const ActivityForm = (props) => {
  const {
    pristine, handleSubmit,
    submitting, actionName,
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
              <FontAwesomeIcon icon="laptop" />
              {` ${actionName} atividade`}
            </h4>
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

export default ActivityForm;
