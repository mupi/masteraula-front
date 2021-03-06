import { connect } from 'react-redux';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import { listQuestions } from 'actions/questionAction';
import { setQuestionIdToNewDocument, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

import {
  addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, removeSelectedDisciplineFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter, removeSelectedTeachingLevelFilter,
  addSelectedSourceFilter, removeSelectedSourceFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
  removeSelectedTopicFilter,
  resetTopicListSelected,
  removeSelectedMyQuestionLabelFilter,
} from 'actions/filterAction';

import {
  addSelectedLabelToQuestion, removeSelectedLabelFromQuestion, RELATED_FROM, createMyQuestionLabel,
} from 'actions/labelAction';

import { history } from 'helpers';

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

const toggleApplyLabelToQuestion = (idQuestion, idLabel, value) => (value
  ? addSelectedLabelToQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION_CARD)
  : removeSelectedLabelFromQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION_CARD));

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  questionPage: state.question.questionPage,
  currentPage: state.question.currentPage,
  filter: state.filter,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  sourceFilters: state.filter.sourceFilters,
  yearFilters: state.filter.yearFilters,
  user: state.session.session.user,
  isFetchingRemoveQuestion: state.document.isFetchingRemoveQuestion,
  isFetchingAddQuestion: state.document.isFetchingAddQuestion,
  idRemovedQuestion: state.document.idRemovedQuestion,
  idAddedQuestion: state.document.idAddedQuestion,
  search: state.filter.searchText,
  labels: state.label.myQuestionLabels,
  isAddingRemovingLabel: state.label.isAddingRemovingLabel,
});

const mapDispatchToProps = (dispatch) => {
  /* Options for Labels */
  const createMyQuestionLabelModalProps = {
    modalProps: {
      open: true,
      title: 'Criar etiqueta',
      nameAction: 'Criar',
      submit: (values) => {
        dispatch(createMyQuestionLabel(values));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  };


  return ({
    listQuestions: (page, filter) => dispatch(listQuestions(page, filter)),
    addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),

    addSelectedDisciplineFilter: (idDiscipline) => {
      dispatch(toggleSelectedDisciplineFilter(idDiscipline, true));
      dispatch(resetTopicListSelected());
    },
    addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, true)),
    addSelectedSourceFilter: (idSource, nameSource) => dispatch(toggleSelectedSourceFilter(idSource, true, nameSource)),
    addSelectedYearFilter: (idYear, nameYear) => dispatch(toggleSelectedYearFilter(idYear, true, nameYear)),

    toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
    toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
    toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
    toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
    toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),
    removeSelectedTopicFilter: idTopic => dispatch(removeSelectedTopicFilter(idTopic)),
    removeSelectedMyQuestionLabelFilter: idMyQuestionLabel => dispatch(removeSelectedMyQuestionLabelFilter(idMyQuestionLabel)),

    removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),

    toggleApplyLabelToQuestion: (idQuestion, idLabel, value) => dispatch(toggleApplyLabelToQuestion(idQuestion, idLabel, value)),

    setQuestionIdToNewDocument: idQuestion => dispatch(setQuestionIdToNewDocument(idQuestion)),

    // Labels
    showCreateMyQuestionLabelModal: () => dispatch(showModal(createMyQuestionLabelModalProps)),

    // new way to handle modals
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }));
    },

  });
};

const QuestionBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionBasePage);


export default QuestionBasePageContainer;
