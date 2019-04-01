import React from 'react';
import {
  Button, FormGroup, Input, Alert, Form,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { first5Elements } from 'helpers/document';
import {
  listMyLastDocuments,
} from 'actions/documentAction';
import MACreateDropdownList from 'components/dropdownlist/MACreateDropdownList';


const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault,
}) => (
   <div>
     <div>
       <select {...input} className="form-control">
         <option value={optionDefault}>
          {label}
        </option>
         {children}
       </select>
       {touched && error && (
         <span className="error-message-text">
           {error}
         </span>
       )}
     </div>
   </div>
);

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


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
      type={type}
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
    const {
      listMyLastDocuments,
    } = this.props;
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
        { /* myLastDocumentsList && first5Elements(myLastDocumentsList.results).map(document => (
                  <option className="c-export-document__select-item" key={document.id} value={document.id}>
                    {document.name}
                  </option>
                )) */}
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
            Criar
          </Button>
          {' '}
          <Button color="secondary" onClick={() => closeModal()}>
            Cancelar
          </Button>
        </div>

      </Form>
    </div>
    )
 ;}
};


const mapStateToProps = state => ({
  modal: state.document.modal,
  initialValues: {
    idQuestion: state.document.willAddQuestion,
  },
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Por favor, digite um nome para a nova prova';
  } else {
    const trueName = values.name.trim();
    if (trueName.length < 3) {
      errors.name = 'Seu nome precisa ter no mínimo 3 caracteres';
    }
  }

  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create_document_withquestion',
  validate,
})(CreateDocumentWithQuestionForm));
