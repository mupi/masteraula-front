import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
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

class LearningObjectSearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    const { author } = this.props;
    const valueFilter = event.target.value;
  }

  render() {
    const {
      handleSubmit, search, clearSearch, clearSearchField, isFetchingQuestions,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="12" className="c-question-base__title d-flex justify-content-between">
            <div className="p-2" />
            <div className="p-2">
              <h4>
                Banco de Objetos de Aprendizagem
                {' '}
              </h4>
            </div>
            <div className="p-2 c-question-base__l-tooltip">
              <span className="c-question-base__tooltip" href="#" id="TooltipExample">
                <FontAwesomeIcon icon="info-circle" />
              </span>
              <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
                Insira termos específicos sobre o que deseja encontrar - o sistema buscará nas tags e em todos os textos dos objetos.
                {' '}
                Ex: ângulos internos. Se desejar buscas mais abrangentes, separe os termos com vírgulas. Exemplo: polígonos, ângulos internos.
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
        <Row className="c-question-base__search-text">
          <p className="c-question-base__search-info hidden">
          Pesquisar por palavras-chave no banco de objetos de aprendizagem
          </p>
          <Field
            component={renderSearchField}
            type="text"
            name="searchTextObject"
            id="searchTextObject"
            placeholder="Pesquisar por palavras-chave banco de objetos de aprendizagem"
            className="form-control"
            validate={minLength3characters}
            search={search}
            clearSearch={clearSearch}
            clearSearchField={clearSearchField}
            isFetchingQuestions={isFetchingQuestions}
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
  }
}

export default reduxForm({
  form: 'learningObjectSearch',
})(LearningObjectSearchForm);