import { connect } from 'react-redux';
import ViewLearningObjectPage from 'pages/LearningObject/ViewLearningObjectPage';

import { fetchLearningObject, deleteLearningObject } from 'actions/learningObjectAction';
import { setQuestionIdToNewDocument, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import { history } from 'helpers';
import { showModal, hideModal } from 'actions/modalAction';
import { addSelectedObjectToQuestion, setObjectIdToNewQuestion } from 'actions/questionAction';
import {
  addSelectedObjectToActivity,
  setObjectIdToNewActivity,
} from 'actions/activityAction';
import {
  addSelectedDisciplineFilter, addSelectedTeachingLevelFilter, removeSelectedDisciplineFilter,
  addSelectedDifficultyFilter, removeSelectedDifficultyFilter, removeSelectedTeachingLevelFilter,
  addSelectedSourceFilter, removeSelectedSourceFilter,
  addSelectedYearFilter, removeSelectedYearFilter,
  resetTopicListSelected,
} from 'actions/filterAction';

import {
  addSelectedLabelToQuestion, removeSelectedLabelFromQuestion, RELATED_FROM, createMyQuestionLabel,
} from 'actions/labelAction';

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
  ? addSelectedLabelToQuestion(idQuestion, idLabel, RELATED_FROM.LEARNING_OBJECT)
  : removeSelectedLabelFromQuestion(idQuestion, idLabel, RELATED_FROM.LEARNING_OBJECT));

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
  filter: state.filter,
  userId: state.session.session.user.id,
  labels: state.label.myQuestionLabels,
  isAddingRemovingLabel: state.label.isAddingRemovingLabel,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = idObject => ({
    modalProps: {
      open: true,
      title: 'Apagar objeto de aprendizagem',
      message: 'Você tem certeza que deseja apagar o objeto de aprendizagem',
      id: idObject,
      deleteAction: () => {
        dispatch(deleteLearningObject(idObject, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

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
    fetchLearningObject: id => dispatch(fetchLearningObject(id)),
    showDeleteModal: id => dispatch(showModal(deleteModalProps(id))),

    addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),

    addSelectedDisciplineFilter: (idDiscipline) => {
      dispatch(toggleSelectedDisciplineFilter(idDiscipline, true));
      dispatch(resetTopicListSelected());
    },

    addSelectedTeachingLevelFilter: idTeachingLevel => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, true)),
    addSelectedSourceFilter: (idSource, nameSource) => dispatch(toggleSelectedSourceFilter(idSource, true, nameSource)),
    addSelectedYearFilter: (idYear, nameYear) => dispatch(toggleSelectedYearFilter(idYear, true, nameYear)),

    // toggleSelectedDisciplineFilter: (idDiscipline, value) => dispatch(toggleSelectedDisciplineFilter(idDiscipline, value)),
    toggleSelectedTeachingLevelFilter: (idTeachingLevel, value) => dispatch(toggleSelectedTeachingLevelFilter(idTeachingLevel, value)),
    toggleSelectedDifficultyFilter: (difficultyType, value) => dispatch(toggleSelectedDifficultyFilter(difficultyType, value)),
    toggleSelectedSourceFilter: (idSource, value) => dispatch(toggleSelectedSourceFilter(idSource, value)),
    toggleSelectedYearFilter: (idYear, value) => dispatch(toggleSelectedYearFilter(idYear, value)),

    removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),

    toggleApplyLabelToQuestion: (idQuestion, idLabel, value) => dispatch(toggleApplyLabelToQuestion(idQuestion, idLabel, value)),

    setQuestionIdToNewDocument: idQuestion => dispatch(setQuestionIdToNewDocument(idQuestion)),

    // create new Label
    showCreateMyQuestionLabelModal: () => dispatch(showModal(createMyQuestionLabelModalProps)),

    /* Options for object in plus icon */
    setObjectIdToNewQuestion: id => dispatch(setObjectIdToNewQuestion(id)),
    addSelectedObjectToQuestion: object => dispatch(addSelectedObjectToQuestion(object)),
    setObjectIdToNewActivity: id => dispatch(setObjectIdToNewActivity(id)),
    addSelectedObjectToActivity: object => dispatch(addSelectedObjectToActivity(object)),
  });
};

const ViewLearningObjectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLearningObjectPage);

export default ViewLearningObjectPageContainer;
