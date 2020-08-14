import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError,
} from 'redux-form';
import MyQuestionEditPage from 'pages/Question/MyQuestionEditPage';
import {
  fetchQuestion, updateQuestion, addSelectedObjectToQuestion, removeSelectedObjectToQuestion, resetSelectedObjects,
} from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters, addSelectedMyQuestionLabelFilter,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions } from 'actions/suggestionAction';
import {
  addSelectedLabelToQuestion, removeSelectedLabelFromQuestion, RELATED_FROM, createMyQuestionLabel,
} from 'actions/labelAction';
import { history } from 'helpers';

// true for dispatch addLabelToQuestionActive / removeLabelFromQuestionActive
const toggleApplyLabelToQuestion = (idQuestion, idLabel, value) => (value
  ? addSelectedLabelToQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION)
  : removeSelectedLabelFromQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION));

const mapStateToProps = (state) => {
  const selector = formValueSelector('edit-question');
  const { user } = state.session.session;

  return ({
    topics: selector(state, 'topics'),
    alternatives: selector(state, 'alternatives'),
    disciplinesList: selector(state, 'disciplines'),
    resolution: selector(state, 'resolution'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    sourceFilters: state.filter.sourceFilters,
    isFetching: state.question.isFetching,
    activeQuestion: state.question.activeQuestion,
    userId: user.id,
    topicSuggestions: state.suggestion.topicSuggestions,
    // add object to question
    selectedObjectList: state.question.selectedObjectList,
    errors: state.form['edit-question'] ? state.form['edit-question'].submitErrors : null,
    sourceQuestionValue: selector(state, 'sourceQuestion'),
    labels: state.label.myQuestionLabels,
    isAddingRemovingLabel: state.label.isAddingRemovingLabel,
  });
};

const mapDispatchToProps = (dispatch) => {
  const openObjectFormModal = () => ({
    modalProps: {
      open: true,
      title: 'Adição de novo objeto de aprendizagem',
      addedFrom: 2,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createObjectModal',
  });

  const confirmModalProps = () => ({
    modalProps: {
      open: true,
      title: 'Confirmação de adição de novo objeto de aprendizagem',
      typeMessage: 'confirm-add-object',
      confirmAction: () => {
        dispatch(showModal(openObjectFormModal()));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'basicConfirm',
  });
  const addMyQuestionLabelFilter = (label) => {
    history.replace('/question-base/1');
    return dispatch(addSelectedMyQuestionLabelFilter(label));
  };

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

  /* Options for Open Learning Object Base modal */
  const openSearchLearningObjectModalProps = {
    modalProps: {
      open: true,
      titlePart: 'à questão',
      closeModal: () => dispatch(hideModal()),
      addSelectedObject: object => dispatch(addSelectedObjectToQuestion(object)),
      removeSelectedObject: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
      callFrom: 'Q',
    },
    modalType: 'searchObjectModal',
  };


  return {
    fetchQuestion: id => dispatch(fetchQuestion(id)),
    listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
    listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
    listSourceFilters: param => dispatch(listSourceFilters(param)),
    listTopics: param => dispatch(listTopics(param)),
    resetTopicList: () => dispatch(resetTopicList()),
    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    // add objects to question
    removeSelectedObjectToQuestion: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),

    showSearchLearningObjectModal: () => dispatch(showModal(openSearchLearningObjectModalProps)),

    // Labels
    showCreateMyQuestionLabelModal: () => dispatch(showModal(createMyQuestionLabelModalProps)),
    showConfirmAddObject: () => dispatch(showModal(confirmModalProps())),

    onSubmit: (values, d, props) => {
      const errors = [];
      let alternativesCleaned = [];
      alternativesCleaned = values.alternatives.map((value, i) => {
        if ((typeof (value.alternativeText) !== 'undefined') && value.alternativeText && value.alternativeText.trim().length > 0) {
          return {
            is_correct: (i === values.selectedIndex),
            text: value.alternativeText,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);

      const resolutionCleaned = typeof (values.resolution) !== 'undefined'
                            && values.resolution && values.resolution.trim().length > 0 ? values.resolution : null;

      const myUpdatedQuestion = {
        id: props.activeQuestion.id,
        statement: values.statement,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
        topics_ids: values.topics.map(topic => topic.id),
        difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
        alternatives: alternativesCleaned.length > 0 ? alternativesCleaned : [],
        // source_id: values.source !== '0' ? values.source : null,
        source: values.sourceQuestion === 'V' && values.source ? values.source.name : null,
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        year: values.sourceQuestion === 'V' ? values.year : null,

        // selected objects to question
        learning_objects_ids: props.selectedObjectList.map(object => object.id),
        resolution: resolutionCleaned,
        secret: values.secret === 'S',
      };

      // validations
      if (myUpdatedQuestion && (myUpdatedQuestion.statement.trim() === '<p></p>' || myUpdatedQuestion.statement.trim() === '')) {
        errors.statement = 'Campo obrigatório. Insira o enunciado';
      }

      if (myUpdatedQuestion && myUpdatedQuestion.alternatives.length === 0 && !myUpdatedQuestion.resolution) {
        errors.general_errors = 'Insira no minimo 3 alternativas ou uma resolução';
      }

      if (myUpdatedQuestion && myUpdatedQuestion.alternatives && myUpdatedQuestion.alternatives.length > 0) {
        if (myUpdatedQuestion && myUpdatedQuestion.alternatives.filter(alternative => alternative.is_correct === true).length === 0) {
          errors.general_errors = 'Selecione uma alternativa correta';
        }

        if (myUpdatedQuestion && myUpdatedQuestion.resolution && myUpdatedQuestion.alternatives.length < 3) {
          errors.general_errors = 'Insira no minimo 3 alternativas ou apague todas';
        }

        if (myUpdatedQuestion && !myUpdatedQuestion.resolution && myUpdatedQuestion.alternatives.length < 3) {
          errors.general_errors = 'Insira no minimo 3 alternativas ou uma resolução';
        }
      }

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

      return dispatch(updateQuestion(myUpdatedQuestion));
    },

    toggleApplyLabelToQuestion: (idQuestion, idLabel, value) => dispatch(toggleApplyLabelToQuestion(idQuestion, idLabel, value)),
    removeSelectedLabelFromQuestion: (idQuestion, idLabel) => dispatch(removeSelectedLabelFromQuestion(idQuestion, idLabel, true)),
    addSelectedMyQuestionLabelFilter: label => dispatch(addMyQuestionLabelFilter(label)),
  };
};

const MyQuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-question',
})(MyQuestionEditPage));

export default MyQuestionEditPageContainer;
