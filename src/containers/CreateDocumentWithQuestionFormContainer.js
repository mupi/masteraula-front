import { connect } from 'react-redux';
import CreateDocumentWithQuestionForm from 'components/document/CreateDocumentWithQuestionForm';
import { hideModal } from 'actions/modalAction';
import { reduxForm } from 'redux-form';

import {
  listMyLastDocuments, createDocument, addQuestionAfterSelectingDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  modal: state.document.modal,
  initialValues: {
    idQuestion: state.document.willAddQuestion,
  },
  myLastDocumentsList: state.document.myLastDocumentsList && state.document.myLastDocumentsList.results
    ? state.document.myLastDocumentsList.results.slice(0, 5) : null,
});

const mapDispatchToProps = dispatch => ({
  listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  onSubmit: (values) => {
    if (values.documentSelected.id === -1) {
      const newDocument = {
        name: values.documentSelected.name,
        idQuestion: values.idQuestion,
      };
      dispatch(createDocument(newDocument, false));
    } else {
      const fetchDocument = {
        id: values.documentSelected.id,
      };

      dispatch(addQuestionAfterSelectingDocument(fetchDocument, values.idQuestion));
    }

    dispatch(hideModal());
  },
});

const validate = (values) => {
  const errors = {};
  if (values.documentSelected && !values.documentSelected.name) {
    errors.documentSelected = 'Por favor, digite um nome para a nova prova';
  } else {
    const trueName = values.documentSelected && values.documentSelected.name && values.documentSelected.name.trim();
    if (trueName && trueName.length < 3) {
      errors.documentSelected = 'O nome da prova precisa ter no mínimo 3 caracteres';
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
