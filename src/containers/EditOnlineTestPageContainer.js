import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector,
} from 'redux-form';
import EditOnlineTestPage from 'pages/OnlineTest/EditOnlineTestPage';
import { fetchOnlineTest, updateOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';
import { fetchQuestion } from 'actions/questionAction';


const mapStateToProps = (state) => {
  const selector = formValueSelector('edit-onlinetest');
  const questions = selector(state, 'questions_document');
  return ({
    activeOnlineTest: state.onlineTest.activeOnlineTest,
    isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
    userId: state.session.session.user.id,
    user: state.session.session.user,
    typeDurationSelected: selector(state, 'typeDuration'),
    totalScore: questions ? questions.map(q => q.score).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0) : 0,
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
    fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
    showQuestionModal: idQuestion => dispatch(showModal(questionModalProps(idQuestion))),
    onSubmit: (values, d, props) => {
      const updatedOnlineTest = {
        start_date: values.start_date,
        finish_date: values.finish_date,
        questions_document: values.questions_document.map(q => ({ id: q.id, score: q.score })),
        duration: values.duration,
        name: values.name,
      };
      return dispatch(updateOnlineTest(props.activeOnlineTest.link, updatedOnlineTest));
    },
  }
  );
};

const EditOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-onlinetest',
})(EditOnlineTestPage));

export default EditOnlineTestPageContainer;
