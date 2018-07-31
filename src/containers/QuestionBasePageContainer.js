import { connect } from 'react-redux';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
});

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionBasePage);

export default QuestionBasePageContainer;
