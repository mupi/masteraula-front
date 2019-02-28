import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row, Col, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionSearchForm = (props) => {
  const {
    handleSubmit, search,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm="12" className="c-question-base__title">
          <h4>
            Banco de Questões
            {' '}
            <span className="c-question-base__tooltip" href="#" id="TooltipExample">
              <FontAwesomeIcon icon="info-circle"/>
            </span>
            <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
              Separe seus termos com vírgulas para buscas mais abrangentes
            </UncontrolledTooltip>
          </h4>
        </Col>
      </Row>
      <Row className="c-question-base__search-text">
        <InputGroup>
          <Field
            component="input"
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Exemplo: fenômenos químicos, temperatura, química"
            className="form-control"
          />
          <InputGroupAddon addonType="prepend">
            <Button type="submit">
              <FontAwesomeIcon icon="search" className="btn__icon" />
              Pesquisar
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <p className="c-question-base__search-info hidden" />
      </Row>
      {search ? (
        <Row>
          <Col sm="12">
            <p className="c-question-base__keywords-title">
              <span>Resultado da busca para:</span>
              <span className="c-question-base__keywords"> 
{' '}
{search}
</span>
            </p>
          </Col>
        </Row>) : ''
      }
    </Form>
  );
};

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchForm);
