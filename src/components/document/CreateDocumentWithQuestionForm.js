import React from 'react';
import {
  Button, FormGroup, Alert, Form,
} from 'reactstrap';
import { Field } from 'redux-form';
import { first5Elements } from 'helpers/document';
import {
  listMyLastDocuments,
} from 'actions/documentAction';
import MACreateDropdownList from 'components/dropdownlist/MACreateDropdownList';


const renderMADropDownListDocuments = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  listOptions, valueField, textField,
}) => (
  <div className="o-list5documents">
    <MACreateDropdownList
      input={input}
      placeholder={placeholder}
      listOptions={listOptions}
      valueField={valueField}
      textField={textField}
    />
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

class CreateDocumentWithQuestionForm extends React.Component {
  componentDidMount() {
    listMyLastDocuments(1, 'date', 'desc');
  }

  render() {
    const {
      handleSubmit, error, closeModal, initialValues, myLastDocumentsList,
    } = this.props;

    return (
      <div>
        <p className="text-center p--without-mbottom">
          Selecione a prova onde vai adicionar a questão N°
          {' '}
          {initialValues.idQuestion}
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="c-export-document__select">
            <Field
              name="name"
              component={renderMADropDownListDocuments}
              className="form-control"
              placeholder="Selecione sua prova"
              valueField="id"
              textField="name"
              listOptions={myLastDocumentsList && first5Elements(myLastDocumentsList.results)}
            />
          </FormGroup>
          <FormGroup check>
            {error && (
            <Alert color="danger">
              {error}
            </Alert>
            )}
          </FormGroup>
          <div className="document__new-document-modal-footer modal-footer">
            <Button type="submit" color="" className="btn--confirm">
              Adicionar
            </Button>
            {' '}
            <Button color="secondary" onClick={() => closeModal()}>
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default CreateDocumentWithQuestionForm;