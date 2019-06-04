import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  Input, InputGroup, InputGroupAddon, Button, Row, Col, UncontrolledTooltip, Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const renderBasicInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
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

const renderField = ({
  input,
  type,
  meta: { pristine },
  clearSearch,
  clearSearchField,
  search,
  placeholder,
}) => (
  <InputGroup>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {search || !pristine ? (
      <InputGroupAddon addonType="prepend">
        <Button className="c-question-base__clear-search" id="dica" onClick={search ? clearSearch : clearSearchField}>
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
    handleSubmit, search, clearSearch, clearSearchField, author, isFetchingQuestions, onlyMyQuestions, addMyQuestionsFilter,
  } = props;

  const handleFilter = (event) => {
    const valueFilter = event.target.value;
    addMyQuestionsFilter(valueFilter, event.target.checked);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm="12" className="c-question-base__title d-flex justify-content-between">
          <div className="p-2" />
          <div className="p-2">
            <h4>
              Banco de Questões
              {' '}
            </h4>
          </div>
          <div className="p-2 c-question-base__l-tooltip">
            <span className="c-question-base__tooltip" href="#" id="TooltipExample">
              <FontAwesomeIcon icon="info-circle" />
            </span>
            <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
              Insira termos específicos sobre o que deseja encontrar - o sistema buscará nas tags e em todos os textos das questões. Ex: ângulos internos. Se desejar buscas mais abrangentes, separe os termos com vírgulas. Exemplo: polígonos, ângulos internos. Combine os termos da busca com as opções de filtro disponíveis na barra lateral.
            </UncontrolledTooltip>
          </div>
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

          search={search}
          clearSearch={clearSearch}
          clearSearchField={clearSearchField}
        />
      </Row>
      <Row className="c-question-base__myquestions-filter">
        <Label check>
          { /* <Field
            name="onlyMyQuestions"
            id="onlyMyQuestions"
            component={renderBasicInputField}
            type="checkbox"
          /> */}
          <Input
            type="checkbox"
            value={author}
            onClick={handleFilter}
            checked={onlyMyQuestions}
            disabled={isFetchingQuestions}
          />

          {'Pesquisar só nas ' }
          <strong>
            {'"Minhas questões"'}
          </strong>
        </Label>
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
        </Row>
      ) : ''
      }
    </Form>
  );
};

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchForm);
