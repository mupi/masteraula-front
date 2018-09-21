import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row,
} from 'reactstrap';


const QuestionSearchForm = (props) => {
  const {
    handleSubmit,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="c-question-base__search-text">
        <p className="c-question-base__search-info">
          Digite o termo e encontre questões relacionadas
        </p>
        <InputGroup>
          <Field
            component="input"
            type="text"
            name="search"
            id="search"
            placeholder="Insira termos para pesquisar"
            className="form-control"
          />
          <InputGroupAddon addonType="prepend">
            <Button type="submit">
              Pesquisar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchForm);
