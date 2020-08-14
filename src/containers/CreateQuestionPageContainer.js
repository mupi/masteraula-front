import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateQuestionPage from 'pages/Question/CreateQuestionPage';
import {
  createQuestion, addSelectedObjectToQuestion, removeSelectedObjectToQuestion, resetSelectedObjects,
} from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions } from 'actions/suggestionAction';


const mapStateToProps = (state) => {
  const selector = formValueSelector('question-create');
  return ({
    topics: selector(state, 'topics'),
    alternatives: selector(state, 'alternatives'),
    disciplinesList: selector(state, 'disciplines'),
    resolution: selector(state, 'resolution'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    sourceFilters: state.filter.sourceFilters,
    selectedObjectList: state.question.selectedObjectList,
    errors: state.form['question-create'] ? state.form['question-create'].submitErrors : null,
    sourceQuestionValue: selector(state, 'sourceQuestion'),
    topicSuggestions: state.suggestion.topicSuggestions,
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


  return ({
    listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
    listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
    listSourceFilters: param => dispatch(listSourceFilters(param)),
    listTopics: param => dispatch(listTopics(param)),
    resetTopicList: () => dispatch(resetTopicList()),
    prepareForm: () => {
      dispatch(initialize('question-create', {
        topics: [],
        alternatives: [{}, {}, {}],
        selectedIndex: 0,
        sourceQuestion: 'A',
      }));
    },

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    showSearchLearningObjectModal: () => dispatch(showModal(openSearchLearningObjectModalProps)),

    removeSelectedObjectToQuestion: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    showConfirmAddObject: () => dispatch(showModal(confirmModalProps())),
    onSubmit: (values, d, props) => {
      const errors = [];
      let alternativesCleaned = [];


      alternativesCleaned = values.alternatives.map((value, i) => {
        if ((typeof (value.alternativeText) !== 'undefined') && value.alternativeText.trim().length > 0) {
          return {
            is_correct: (i === values.selectedIndex),
            text: value.alternativeText,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);

      const resolutionCleaned = typeof (values.resolution) !== 'undefined'
                              && values.resolution && values.resolution.trim().length > 0 ? values.resolution : null;

      const newQuestion = {
        statement: values.statement,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
        topics_ids: values.topics.map(topic => topic.id),
        difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
        alternatives: alternativesCleaned.length > 0 ? alternativesCleaned : [],
        //  source_id: values.source !== '0' && values.sourceQuestion === 'V' ? values.source : null,
        source: values.sourceQuestion === 'V' && values.source ? values.source.name : null,
        // source: values.sourceQuestion === 'V' ? (values.source ) : null,

        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        year: values.sourceQuestion === 'V' ? values.year : null,

        learning_objects_ids: props.selectedObjectList.map(object => object.id),
        resolution: resolutionCleaned,
        secret: values.secret === 'S',
      };

      // validations
      if (newQuestion && (newQuestion.statement.trim() === '<p></p>' || newQuestion.statement.trim() === '')) {
        errors.statement = 'Campo obrigatório. Insira o enunciado';
      }

      if (newQuestion && newQuestion.alternatives.length === 0 && !newQuestion.resolution) {
        errors.general_errors = 'Insira no minimo 3 alternativas ou uma resolução';
      }

      if (newQuestion && newQuestion.alternatives && newQuestion.alternatives.length > 0) {
        if (newQuestion && newQuestion.alternatives.filter(alternative => alternative.is_correct === true).length === 0) {
          errors.general_errors = 'Campo obrigatório. Selecione uma resposta correta';
        }

        if (newQuestion && newQuestion.resolution && newQuestion.alternatives.length < 3) {
          errors.general_errors = 'Insira no minimo 3 alternativas ou apague todas';
        }

        if (newQuestion && !newQuestion.resolution && newQuestion.alternatives.length < 3) {
          errors.general_errors = 'Insira no minimo 3 alternativas ou uma resolução';
        }
      }


      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

      return dispatch(createQuestion(newQuestion));
    },
  });
};

const CreateQuestionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-create',
})(CreateQuestionPage));

export default CreateQuestionPageContainer;
