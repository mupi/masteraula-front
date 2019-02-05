import { connect } from 'react-redux';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';
import { toggleModal, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import {
  addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, removeSelectedDisciplineFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter, removeSelectedTeachingLevelFilter,
  addSelectedSourceFilter, removeSelectedSourceFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
} from 'actions/filterAction';
import { history } from 'helpers/history';


const toggleSelectedDisciplineFilter = (idDiscipline, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedDisciplineFilter(idDiscipline) : removeSelectedDisciplineFilter(idDiscipline);
};

const toggleSelectedTeachingLevelFilter = (idTeachingLevel, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedTeachingLevelFilter(idTeachingLevel) : removeSelectedTeachingLevelFilter(idTeachingLevel);
};

const toggleSelectedDifficultyFilter = (difficultyType, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedDifficultyFilter(difficultyType) : removeSelectedDifficultyFilter(difficultyType);
};
const toggleSelectedSourceFilter = (idSource, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedSourceFilter(idSource) : removeSelectedSourceFilter(idSource);
};

const toggleSelectedYearFilter = (idYear, value) => {
  history.replace('/question-base/1');
  return value
    ? addSelectedYearFilter(idYear) : removeSelectedYearFilter(idYear);
};

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
  filter: state.filter,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  sourceFilters: state.filter.sourceFilters,
  yearFilters: state.filter.yearFilters,
});

const mapDispatchToProps = dispatch => ({
  listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  addSelectedDisciplineFilter: idDiscipline => dispatch(addSelectedDisciplineFilter(idDiscipline)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(addSelectedTeachingLevelFilter(idTeachingLevel)),
  addSelectedSourceFilter: idSource => dispatch(addSelectedSourceFilter(idSource)),
  addSelectedYearFilter: idYear => dispatch(addSelectedYearFilter(idYear)),

  toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
  toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
  toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
  toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),

  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
});

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionBasePage);


export default QuestionBasePageContainer;
