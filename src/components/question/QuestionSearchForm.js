import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row,
} from 'reactstrap';


const QuestionSearchForm = (props) => {
  const {
    handleSubmit, search,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="c-question-base__search-text">
        <p className="c-question-base__search-info">
          Pesquisar por palavras-chave no banco de questões
        </p>
        <InputGroup>
          <Field
            component="input"
            type="text"
            name="searchText"
            id="searchText"
            placeholder="Ex: fenômenos químicos, temperatura, química"
            className="form-control"
          />
          <InputGroupAddon addonType="prepend">
            <Button type="submit">
            <i class="fa fa-search btn__icon"/>Pesquisar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Row>
      {search ? 'Você pesquisou: '.concat(search) : ''
      }
    </Form>
  );
};

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchForm);
