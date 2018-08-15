import { connect } from 'react-redux';
import QuestionPage from 'pages/Question/QuestionPage';
import { fetchQuestion, rateQuestion } from 'actions/questionAction';
import { toggleModal , addSelectedQuestion} from 'actions/documentAction';

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
  toggleModal: modal => dispatch(toggleModal(modal)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),

});

const QuestionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionPage);

export default QuestionPageContainer;
