import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector,
} from 'redux-form';
import CreateOnlineTestPage from 'pages/OnlineTest/CreateOnlineTestPage';
import { fetchBaseDocument, createOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';
import { fetchQuestion } from 'actions/questionAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('create-onlinetest');
  return ({
    baseDocument: state.onlineTest.baseDocument,
    isFetchingBaseDocument: state.onlineTest.isFetchingBaseDocument,
    typeDurationSelected: selector(state, 'typeDuration'),
  });
};


const mapDispatchToProps = (dispatch) => {
  const questionModalProps = idQuestion => ({
    modalProps: {
      open: true,
      idQuestion,
      fetchQuestion: () => {
        dispatch(fetchQuestion(idQuestion));
      },
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'question',
  });

  return ({
    fetchBaseDocument: id => dispatch(fetchBaseDocument(id)),
    showQuestionModal: idQuestion => dispatch(showModal(questionModalProps(idQuestion))),
    onSubmit: (values/* , d, props */) => {
      const newOnlineTest = {

        start_date: values.start_date,
        finish_date: values.finish_date,
        results: values.questions_document,

        duration: values.duration,
        name: values.name,
      };
      return dispatch(createOnlineTest(newOnlineTest));
    },
  }
  );
};

const CreateOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-onlinetest',
})(CreateOnlineTestPage));

export default CreateOnlineTestPageContainer;
