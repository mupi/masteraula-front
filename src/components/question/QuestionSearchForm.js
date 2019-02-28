import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  Input, InputGroup, InputGroupAddon, Button, Row, Col, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requiredValidator } from 'helpers/validators';

const renderField = ({
  input,
  type,
  meta: { pristine, error },
  clearSearch,
  search,
  placeholder,
}) => (
  <InputGroup>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {search || !pristine || !error ? (
      <InputGroupAddon addonType="prepend">
        <Button className="c-question-base__clear-search" id="dica" onClick={clearSearch}>
          <FontAwesomeIcon icon="times-circle" />
        </Button>
        <UncontrolledTooltip placement="bottom" target="dica" className="tooltip__message">
              Limpar busca
        </UncontrolledTooltip>
      </InputGroupAddon>
    ) : ''}
    <InputGroupAddon addonType="prepend">
      <Button type="submit">
        <FontAwesomeIcon icon="search" className="btn__icon" />
              Pesquisar
      </Button>
    </InputGroupAddon>
  </InputGroup>
);

const QuestionSearchForm = (props) => {
  const {
    handleSubmit, search, clearSearch,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm="12" className="c-question-base__title">
          <h4>Banco de Questões</h4>
        </Col>
      </Row>
      <Row className="c-question-base__search-text">
        <p className="c-question-base__search-info hidden">
          Pesquisar por palavras-chave no banco de questões
        </p>
        <Field
          component={renderField}
          type="text"
          name="searchText"
          id="searchText"
          placeholder="Pesquisar por palavras-chave no banco de questões"
          className="form-control"
          validate={requiredValidator}
          search={search}
          clearSearch={clearSearch}
        />
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
