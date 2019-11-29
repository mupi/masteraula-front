import React, { Component } from 'react';
import {
  Field, reduxForm, Form,
} from 'redux-form';
import {
  /* Input, */ InputGroup, InputGroupAddon, Button, Row, UncontrolledTooltip,
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
  isFetchingQuestions,
  topicSuggestions,
  listTopicSuggestions,
  clearSearchText,
  search,
}) => {
  const autocomplete = React.createRef();

  const handleSubmit = (value) => {
    search(value);
  };

  return (
    <div className="c-question-base__search-all-section">
      <InputGroup>
        <MAAutocompleteTopics
          ref={autocomplete}
          input={input}
          suggestions={topicSuggestions}
          fetchSuggestions={listTopicSuggestions}
          onSubmit={handleSubmit}
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
          <Button type="submit" disabled={isFetchingQuestions}>
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

class QuestionSearchText extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    const { addMyQuestionsFilter } = this.props;
    const valueFilter = event.target.value;
    addMyQuestionsFilter(valueFilter, event.target.checked);
  }

  render() {
    const {
      handleSubmit, searchText, clearSearchText,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row className="c-question-base__search-text">
          <p className="c-question-base__search-info hidden">
            Pesquisar por palavras-chave no banco de questões
          </p>
          <Field
            component={renderSearchFieldAutocomplete}
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Pesquisar por palavras-chave no banco de questões"
            className="form-control"
            validate={minLength3characters}
            searchText={searchText}
            clearSearchText={clearSearchText}
            autoFocus
            {...this.props}
          />
        </Row>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchText);
