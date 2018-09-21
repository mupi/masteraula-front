import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';
import { toggleModal, addSelectedQuestion } from 'actions/documentAction';
import { addSelectedDisciplineFilter, addSelectedTeachingLevelFilter } from 'actions/filterAction';
import { setSearchText, } from 'actions/filterAction';
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
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(addSelectedTeachingLevelFilter(idTeachingLevel)),
  handleSubmitQuestionSearch: values => dispatch(setSearchText(values.search)),
});

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'questionSearch',
})(QuestionBasePage));


export default QuestionBasePageContainer;
