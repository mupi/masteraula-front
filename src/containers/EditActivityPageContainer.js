import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError,
} from 'redux-form';
import EditActivityPage from 'pages/Activity/EditActivityPage';
import {
  updateActivity,
  addSelectedObjectToActivity, removeSelectedObjectFromActivity, resetSelectedObjects,
  addTaskToActivity, removeTaskFromActivity,
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
  const selector = formValueSelector('edit-activity');
  const { user } = state.session.session;
  return ({
    topics: selector(state, 'topics'),
    disciplinesList: selector(state, 'disciplines'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    selectedObjectList: state.activity.selectedObjectList,
    errors: state.form['edit-activity'] ? state.form['edit-activity'].submitErrors : null,
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
    showSearchLearningObjectModal: (singleSelection = false, stationIndex = null) => {
      dispatch(showModal(openSearchLearningObjectModalProps(singleSelection, stationIndex)));
    },

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    removeSelectedObjectFromActivity: idObject => dispatch(removeSelectedObjectFromActivity(idObject)),
    resetSelectedObjects: () => dispatch(resetSelectedObjects()),

    /* task's functions */
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
            description_task: value.student_expectation,
            student_expectation: value.student_expectation,
            teacher_expectation: value.teacher_expectation,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);


      const updatedActivity = {
        learning_objects_ids: props.selectedObjectList && props.selectedObjectList.length > 0
          ? props.selectedObjectList.map(object => object.id) : [],
        topics_ids: values.topics.map(topic => topic.id),
        difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
        disciplines_ids: values.disciplines.map(discipline => discipline.id),
        teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
        tasks: newTasks.length > 0 ? newTasks : [],
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
      };

      // validations
      if (updatedActivity && updatedActivity.tasks.length < 1) {
        errors.general_errors = 'Insira no minimo 1 tarefa';
      }

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
      return dispatch(updateActivity(updatedActivity));
    },
  });
};

const EditActivityPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-activity',
})(EditActivityPage));

export default EditActivityPageContainer;
