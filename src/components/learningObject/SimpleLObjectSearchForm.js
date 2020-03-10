import React from 'react';
import { Field, Form } from 'redux-form';
import {
  Input, InputGroup, InputGroupAddon, Button, Row, Col, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  minLength3characters,
} from 'helpers/validators';

const renderSearchField = ({
  input,
  type,
  meta: {
    pristine, touched, error, warning,
  },
  clearSearch,
  clearSearchField,
  search,
  placeholder,
  isFetchingObjects,
}) => (
  <div className="c-question-base__search-all-section">
    <InputGroup>
      <Input
        {...input}
        placeholder={placeholder}
        type={type}
        className="c-question-base__search-field"
        disabled={isFetchingObjects}
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
        <Button type="submit" disabled={isFetchingObjects}>
          <FontAwesomeIcon icon="search" className="btn__icon" />
                Pesquisar
        </Button>
      </InputGroupAddon>
    </InputGroup>
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

const SimpleLObjectSearchForm = (props) => {
  const {
    handleSubmit, search, clearSearch, clearSearchField, isFetchingObjects,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="c-question-base__search-text">
        <Field
          component={renderSearchField}
          type="text"
          name="searchTextObject"
          id="searchTextObject"
          placeholder="Pesquisar por palavras-chave no banco de objetos de aprendizagem"
          className="form-control"
          validate={minLength3characters}
          search={search}
          clearSearch={clearSearch}
          clearSearchField={clearSearchField}
          isFetchingObjects={isFetchingObjects}
          autoFocus
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
        </Row>
      ) : ''
      }
    </Form>
  );
};

export default SimpleLObjectSearchForm;
