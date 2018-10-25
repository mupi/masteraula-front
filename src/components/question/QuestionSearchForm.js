import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row, Col,
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
              <i className="fa fa-search btn__icon"/>
              Pesquisar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Row>
      {search ? (
        <Row>
          <Col sm="12">
            <p className="c-question-base__keywords-title">
              <span>Termos pesquisados:</span>
              <span className="c-question-base__keywords"> {search}</span>
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
