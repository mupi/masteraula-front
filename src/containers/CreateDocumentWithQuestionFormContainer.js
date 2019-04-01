import { connect } from 'react-redux';
import CreateDocumentWithQuestionForm from 'components/document/CreateDocumentWithQuestionForm';
import { hideModal } from 'actions/modalAction';
import { reduxForm, formValueSelector } from 'redux-form';

import {
  listMyLastDocuments, addSelectedQuestion, createDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  modal: state.document.modal,
  initialValues: {
    idQuestion: state.document.willAddQuestion,
  },
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  onSubmit: (values) => {
    console.log('hola');
    dispatch(createDocument(values));
    dispatch(hideModal());
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Por favor, digite um nome para a nova prova';
  } else {
    const trueName = values.name.trim();
    if (trueName.length < 3) {
      errors.name = 'O nome da prova precisa ter no mínimo 3 caracteres';
    }
  }

  return errors;
};
const CreateDocumentWithQuestionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create_document_withquestion',
  validate,
})(CreateDocumentWithQuestionForm));


export default CreateDocumentWithQuestionFormContainer;
