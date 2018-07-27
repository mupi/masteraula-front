import { connect } from 'react-redux';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
});

const mapDispatchToProps = dispatch => ({
  listQuestions: page => dispatch(listQuestions(page)),
});

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionBasePage);

export default QuestionBasePageContainer;
