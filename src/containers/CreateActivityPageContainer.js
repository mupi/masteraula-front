import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateActivityPage from 'pages/Activity/CreateActivityPage';
import {
  createActivity,
  addSelectedObjectToActivity, removeSelectedObjectFromActivity, resetSelectedObjects,
  addTaskToActivity, removeTaskFromActivity,
  resetTasksFromActivity,
} from 'actions/activityAction';

import {
  listDisciplineFilters, listTeachingLevelFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions } from 'actions/suggestionAction';

/* Learning Object search modal called from
Q = Question
C = ClassPlan
A = Activity
*/

const mapStateToProps = (state) => {
  const selector = formValueSelector('create-activity');
  const { user } = state.session.session;
  return ({
    topics: selector(state, 'topics'),
    disciplinesList: selector(state, 'disciplines'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    selectedObjectList: state.activity.selectedObjectList,
    errorsActivity: state.form['create-activity'] ? state.form['create-activity'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
    tasks: state.activity.tasks,
  });
};

const mapDispatchToProps = (dispatch) => {
  /* Options for Open Learning Object Base modal */
  const openSearchLearningObjectModalProps = (singleSelection, stationIndex) => ({
    modalProps: {
      open: true,
      titlePart: 'à atividade',
      closeModal: () => dispatch(hideModal()),
      addSelectedObject: (object) => {
        dispatch(addSelectedObjectToActivity(object));
      },
      removeSelectedObject: (idObject) => {
        dispatch(removeSelectedObjectFromActivity(idObject));
      },
      callFrom: 'A',
      singleSelection,
      stationIndex,
    },
    modalType: 'searchObjectModal',
  });


  return ({
    listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
    listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
    listTopics: param => dispatch(listTopics(param)),
    resetTopicList: () => dispatch(resetTopicList()),
    prepareForm: () => {
      dispatch(initialize('create-activity', {
        topics: [],
        tasks: [{}],
      }));
    },
    showSearchLearningObjectModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchLearningObjectModalProps(singleSelection, stationIndex)));
    },

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectFromActivity: idObject => dispatch(removeSelectedObjectFromActivity(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),

    /* class plan station's functions */
    resetTasksFromActivity: () => dispatch(resetTasksFromActivity()),
    addTaskToActivity: task => dispatch(addTaskToActivity(task)),
    removeTaskFromActivity: removedIndex => dispatch(removeTaskFromActivity(removedIndex)),
    onSubmit: (values, d, props) => {
      const errors = [];

      const newTasks = values.tasks.map((value, i) => {
        if ((typeof (value.alternativeText) !== 'undefined') && value.alternativeText.trim().length > 0) {
          return {
            is_correct: (i === values.selectedIndex),
            text: value.alternativeText,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);


      const newActivity = {
        name: values.name,
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        topics_ids: values.topics.map(topic => topic.id),

        learning_objects_ids: props.selectedObjectList && props.selectedObjectList.length > 0
          ? props.selectedObjectList.map(object => object.id) : [],
        documents_ids: props.selectedDocumentList && props.selectedDocumentList.length > 0
          ? props.selectedDocumentList.map(document => document.id) : [],
        tasks: newTasks,

        description: values.description,
      };


      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
      return dispatch(createActivity(newActivity));
    },
  });
};

const CreateActivityPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-activity',
})(CreateActivityPage));

export default CreateActivityPageContainer;
