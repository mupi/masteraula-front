import { connect } from 'react-redux';
import QuestionPage from 'pages/Question/QuestionPage';
import { fetchQuestion, rateQuestion } from 'actions/questionAction';
import { setQuestionIdToNewDocument, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';
import {
  addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, removeSelectedDisciplineFilter,
  removeSelectedTeachingLevelFilter,
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

const toggleSelectedSourceFilter = (idSource, value, nameSource = 'default') => {
  history.replace('/question-base/1');
  return value
    ? addSelectedSourceFilter(idSource, nameSource) : removeSelectedSourceFilter(idSource);
};

const toggleSelectedYearFilter = (idYear, value, nameYear = 'default') => {
  history.replace('/question-base/1');
  return value
    ? addSelectedYearFilter(idYear, nameYear) : removeSelectedYearFilter(idYear);
};

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  activeQuestion: state.question.activeQuestion,
  rating: state.question.rating,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  role: state.session.session.user.groups,
  userId: state.session.session.user.id,
  isFetchingRemoveQuestion: state.document.isFetchingRemoveQuestion,
  isFetchingAddQuestion: state.document.isFetchingAddQuestion,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  onRate: rating => dispatch(rateQuestion(rating)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),

  addSelectedDisciplineFilter: idDiscipline => dispatch(toggleSelectedDisciplineFilter(idDiscipline, true)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, true)),
  addSelectedSourceFilter: (idSource, nameSource) => dispatch(toggleSelectedSourceFilter(idSource, true, nameSource)),
  addSelectedYearFilter: (idYear, nameYear) => dispatch(toggleSelectedYearFilter(idYear, true, nameYear)),

  toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
  toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
  toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),

  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),

  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  setQuestionIdToNewDocument: idQuestion => dispatch(setQuestionIdToNewDocument(idQuestion)),

});

const QuestionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionPage);

export default QuestionPageContainer;
