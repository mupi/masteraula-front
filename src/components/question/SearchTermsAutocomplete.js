import React from 'react';
import {
  Field, Form,
} from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  minLength3characters,
} from 'helpers/validators';
import MAAutocompleteTopics from 'components/autocomplete/MAAutocompleteTopics';

const renderSearchFieldAutocomplete = ({
  input,
  // type,
  meta: {
    pristine, touched, error, warning,
  },
  searchText,
  isFetching,
  topicSuggestions,
  listTopicSuggestions,
  clearSearchText,
  search,
  placeholder,
}) => {
  const handleSubmit = (value) => {
    search(value);
  };

  return (
    <div className="c-question-base__search-all-section">
      <InputGroup>
        <MAAutocompleteTopics
          input={input}
          allSuggestions={topicSuggestions}
          fetchSuggestions={listTopicSuggestions}
          onSubmit={handleSubmit}
          placeholder={placeholder}
        />
        {searchText || !pristine ? (
          <InputGroupAddon addonType="prepend">
            <Button className="c-question-base__clear-search" id="dica" onClick={clearSearchText}>
              <FontAwesomeIcon icon="times-circle" />
            </Button>
            <UncontrolledTooltip placement="bottom" target="dica" className="tooltip__message">
              Limpar busca
            </UncontrolledTooltip>
          </InputGroupAddon>
        ) : ''}
        <InputGroupAddon addonType="prepend">
          <Button type="submit" disabled={isFetching}>
            <FontAwesomeIcon icon="search" className="btn__icon" />
            Pesquisar
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {touched
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

const SearchTermsAutocomplete = (props) => {
  const {
    handleSubmit, searchText, clearSearchText, baseName,
  } = props;

  const searchInfo = `Pesquisar por palavras-chave no banco de ${baseName}`;
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="c-question-base__search-text">
        <Field
          component={renderSearchFieldAutocomplete}
          type="text"
          name="searchText"
          id="searchText"
          placeholder={searchInfo}
          className="form-control"
          validate={minLength3characters}
          searchText={searchText}
          clearSearchText={clearSearchText}
          autoFocus
          {...props}
        />
      </Row>
    </Form>
  );
};

export default SearchTermsAutocomplete;
