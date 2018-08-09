import { connect } from 'react-redux';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';
import { toggleModal } from 'actions/documentAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
  filter: state.filter,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
  listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
  toggleModal: modal => dispatch(toggleModal(modal)),
});

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionBasePage);

export default QuestionBasePageContainer;
