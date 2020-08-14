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
    errors: state.form['create-activity'] ? state.form['create-activity'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
    tasks: state.activity.tasks,
  });
};

const mapDispatchToProps = (dispatch) => {
  const openObjectFormModal = () => ({
    modalProps: {
      open: true,
      title: 'Adição de novo objeto de aprendizagem',
      addedFrom: 1,
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
        secret: 'P',
      }));
    },
    showSearchLearningObjectModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchLearningObjectModalProps(singleSelection, stationIndex)));
    },

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectFromActivity: idObject => dispatch(removeSelectedObjectFromActivity(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),
    showConfirmAddObject: () => dispatch(showModal(confirmModalProps())),

    /* task's functions */
    resetTasksFromActivity: () => dispatch(resetTasksFromActivity()),
    addTaskToActivity: task => dispatch(addTaskToActivity(task)),
    removeTaskFromActivity: removedIndex => dispatch(removeTaskFromActivity(removedIndex)),
    onSubmit: (values, d, props) => {
      /*
{
  "learning_objects_ids": [id],
  "topics_ids":[id],
  "difficulty":"M",
  "disciplines_ids": [id],
  "teaching_levels_ids": [id],
  "tasks": [{"description_task": "string", "student_expectation": "string", "teacher_expectation":"string"}],
  "tags":["string"]
}

*/
      const errors = [];

      const newTasks = values.tasks.map((value) => {
        if (((typeof (value.description_task) !== 'undefined') && value.description_task.trim().length > 0)
        && ((typeof (value.student_expectation) !== 'undefined') && value.student_expectation.trim().length > 0)
        ) {
          return {
            description_task: value.description_task,
            student_expectation: value.student_expectation,
            teacher_expectation: value.teacher_expectation,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);


      const newActivity = {
        learning_objects_ids: props.selectedObjectList && props.selectedObjectList.length > 0
          ? props.selectedObjectList.map(object => object.id) : [],
        topics_ids: values.topics.map(topic => topic.id),
        difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        tasks: newTasks.length > 0 ? newTasks : [],
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
        secret: values.secret === 'S',
      };

      // validations
      if (newActivity && newActivity.tasks.length < 1) {
        errors.general_errors = 'Insira no minimo 1 tarefa';
      }

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
