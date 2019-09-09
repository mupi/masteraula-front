import { connect } from 'react-redux';
import ViewLearningObjectPage from 'pages/LearningObject/ViewLearningObjectPage';

import { fetchLearningObject } from 'actions/learningObjectAction';
import { setQuestionIdToNewDocument, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import { history } from 'helpers/history';
import { showModal, hideModal } from 'actions/modalAction';

import {
  addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, removeSelectedDisciplineFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter, removeSelectedTeachingLevelFilter,
  addSelectedSourceFilter, removeSelectedSourceFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
} from 'actions/filterAction';

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

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isFetchingLearningObject: state.learningObject.isFetchingLearningObject,
  activeLearningObject: state.learningObject.activeLearningObject,
  error: state.learningObject.error,
  activeDocument: state.document.activeDocument,
  isFetchingRemoveQuestion: state.document.isFetchingRemoveQuestion,
  isFetchingAddQuestion: state.document.isFetchingAddQuestion,
  idRemovedQuestion: state.document.idRemovedQuestion,
  idAddedQuestion: state.document.idAddedQuestion,
});

const mapDispatchToProps = dispatch => ({
  fetchLearningObject: id => dispatch(fetchLearningObject(id)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),

  addSelectedDisciplineFilter: idDiscipline => dispatch(toggleSelectedDisciplineFilter(idDiscipline, true)),
  addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, true)),
  addSelectedSourceFilter: (idSource, nameSource) => dispatch(toggleSelectedSourceFilter(idSource, true, nameSource)),
  addSelectedYearFilter: (idYear, nameYear) => dispatch(toggleSelectedYearFilter(idYear, true, nameYear)),

  toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
  toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
  toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
  toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
  toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),

  setQuestionIdToNewDocument: idQuestion => dispatch(setQuestionIdToNewDocument(idQuestion)),

});

const ViewLearningObjectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLearningObjectPage);

export default ViewLearningObjectPageContainer;
