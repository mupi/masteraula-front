import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError,
} from 'redux-form';
import CreateOnlineTestPage from 'pages/OnlineTest/CreateOnlineTestPage';
import { fetchBaseDocument, createOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';
import { fetchQuestion } from 'actions/questionAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('create-onlinetest');
  const questions = selector(state, 'questions_document');
  const totalScore = questions
    // ? questions.map(q => q.score).reduce((a, b) => parseInt(!isNaN(a) ? a : 0, 10) + parseInt(!isNaN(b) ? b : 0, 10), 0) : 0;
    // ? questions.map(q => q.score).filter(item => item).reduce((a, b) => parseFloat(a).toFixed(2) + parseFloat(b).toFixed(2), 0) : 0;
    ? questions.map(q => q.score).filter(item => item).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0) : 0;
  // ? questions.map(q => q.score).reduce((a, b) => parseInt(a && a.length > 0 ? a : 0, 10) + parseInt(b && b.length > 0 ? b : 0, 10), 0) : 0;
  const totalScoreFinal = !isNaN(totalScore) ? totalScore : 0;
  return ({
    baseDocument: state.onlineTest.baseDocument,
    isFetchingBaseDocument: state.onlineTest.isFetchingBaseDocument,
    typeDurationSelected: selector(state, 'typeDuration'),
    totalScore: totalScoreFinal,
    errors: state.form['create-onlinetest'] ? state.form['create-onlinetest'].submitErrors : null,
    userId: state.session.session.user.id,
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
    onSubmit: (values, d, props) => {
      const errors = {};
      const newOnlineTest = {
        start_date: values.start_date,
        finish_date: values.finish_date,
        // questions_document: values.questions_document.map(q => ({ question: q.id, score: parseFloat(q.score).toFixed(2) })),
        questions_document: values.questions_document.map(q => ({ question: q.id, score: q.score.length > 0 ? parseInt(q.score, 10) : null })),

        duration: values.typeDuration === 'R' ? values.duration : null,
        name: values.name,
      };

      const startDate = new Date(values.start_date);
      const endDate = new Date(values.finish_date);

      const isStartGreaterThanFinish = startDate > endDate;
      if (isStartGreaterThanFinish) {
        errors.start_date = 'A data fim deve ser maior do que a ínicio';
      }

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
      return dispatch(createOnlineTest(newOnlineTest, props.baseDocument.id));
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
