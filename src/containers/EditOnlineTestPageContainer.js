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
  return ({
    activeOnlineTest: state.onlineTest.activeOnlineTest,
    isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
    userId: state.session.session.user.id,
    user: state.session.session.user,
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
    fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
    showQuestionModal: idQuestion => dispatch(showModal(questionModalProps(idQuestion))),
    onSubmit: (values/* , d, props */) => {
      const newOnlineTest = values;
      return dispatch(updateOnlineTest(newOnlineTest));
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
