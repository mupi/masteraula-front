import { connect } from 'react-redux';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, rateQuestion } from 'actions/questionAction';
import { toggleModal, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  activeQuestion: state.question.activeQuestion,
  rating: state.question.rating,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  onRate: rating => dispatch(rateQuestion(rating)),
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
});

const QuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionEditPage);

export default QuestionEditPageContainer;
