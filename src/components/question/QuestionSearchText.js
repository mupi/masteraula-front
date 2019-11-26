import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  Input, InputGroup, InputGroupAddon, Button, Row, UncontrolledTooltip,
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
  isFetchingQuestions,
  autoFocus,
}) => (
  <div className="c-question-base__search-all-section">
    <InputGroup>
      <Input
        {...input}
        placeholder={placeholder}
        type={type}
      //  disabled={isFetchingQuestions}
        className="c-question-base__search-field"
        autoFocus={autoFocus}
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
        <Button type="submit" disabled={isFetchingQuestions}>
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
      handleSubmit, search, clearSearch, clearSearchField, isFetchingQuestions,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row className="c-question-base__search-text">
          <p className="c-question-base__search-info hidden">
          Pesquisar por palavras-chave no banco de questões
          </p>
          <Field
            component={renderSearchField}
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Pesquisar por palavras-chave no banco de questões"
            className="form-control"
            validate={minLength3characters}
            search={search}
            clearSearch={clearSearch}
            clearSearchField={clearSearchField}
            isFetchingQuestions={isFetchingQuestions}
            autoFocus
          />
        </Row>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchText);
