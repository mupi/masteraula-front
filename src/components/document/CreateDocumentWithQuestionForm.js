import React from 'react';
import {
  Button, FormGroup, Form,
} from 'reactstrap';
import { Field } from 'redux-form';
import {
  listMyLastDocuments,
} from 'actions/documentAction';
import MACreateDropdownList from 'components/dropdownlist/MACreateDropdownList';


const renderMADropDownListDocuments = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  listOptions, valueField, textField,
  messages,
}) => (
  <div className="o-list5documents">
    <MACreateDropdownList
      input={input}
      placeholder={placeholder}
      listOptions={listOptions}
      valueField={valueField}
      textField={textField}
      messages={messages}
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

const messagesDropdownList = {
  emptyList: 'Não existem resultados',
  emptyFilter: 'Não existem resultados que coincidam',
  filterPlaceholder: 'Selecione ou dê o nome para uma nova prova',
  createOption: function createOption(_ref) {
    const { searchTerm } = _ref;
    return ['+ Criar nova prova', searchTerm && ' ', searchTerm && <strong key="_">{searchTerm}</strong>];
  },
};

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
          Selecione ou crie uma prova onde vai adicionar a questão N°
          {' '}
          {initialValues.idQuestion}
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="c-export-document__select">
            <Field
              name="documentSelected"
              component={renderMADropDownListDocuments}
              className="form-control"
              placeholder="Selecione dentre as 5 últimas provas criadas"
              valueField="id"
              textField="name"
              listOptions={myLastDocumentsList}
              messages={messagesDropdownList}
            />
          </FormGroup>
          {error && (
            <span className="error-message-text">
              {error}
            </span>
          )}
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
