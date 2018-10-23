import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import {
  InputGroup, InputGroupAddon, Button, Row, Badge
} from 'reactstrap';


const QuestionSearchForm = (props) => {
  const {
    handleSubmit, search
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
            placeholder="Ex: Nazismo, segunda guerra"
            className="form-control"
          />
          <InputGroupAddon addonType="prepend">
            <Button type="submit" style={{'background-color':'#0e2538'}}>
              Pesquisar
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Row>
        {search? search.values.searchText? "Você pesquisou: ".concat(search.values.searchText):'' :''
      }
    </Form>
  );
};

export default reduxForm({
  form: 'questionSearch',
})(QuestionSearchForm);
