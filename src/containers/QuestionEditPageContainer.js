import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion } from 'actions/questionAction';
import { toggleModal, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';

const mapStateToProps = state => ({
  initialValues: {
    difficulty: state.question.activeQuestion.difficulty,
  },
  isFetching: state.question.isFetching,
  activeQuestion: state.question.activeQuestion,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
});


const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
});

const QuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-edit',
})(QuestionEditPage));

export default QuestionEditPageContainer;
