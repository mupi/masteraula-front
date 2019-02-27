import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row, Col, UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <InputGroup>
          <Field
            component="input"
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Pesquisar por palavras-chave no banco de questões"
            className="form-control"
          />
          {search ? (
            <InputGroupAddon addonType="prepend">
              <Button color="primary" id="dica" onClick={clearSearch}>
              X
              </Button>
              <UncontrolledTooltip placement="bottom" target="dica">
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
