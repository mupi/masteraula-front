import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateClassPlanPage from 'pages/ClassPlan/CreateClassPlanPage';
import { createClassPlan /* removeSelectedObjectToClassPlan, resetSelectedObjects */ } from 'actions/classPlanAction';

import {
  listDisciplineFilters, listTeachingLevelFilters, listTeachingYearFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';
import { listTopicSuggestions } from 'actions/suggestionAction';


const mapStateToProps = (state) => {
  const selector = formValueSelector('create-classplan');
  const { user } = state.session.session;
  return ({
    topics: selector(state, 'topics'),
    disciplinesList: selector(state, 'disciplines'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    teachingYearFilters: state.filter.teachingYearFilters,
    sourceFilters: state.filter.sourceFilters,
    selectedObjectList: state.question.selectedObjectList,
    errorsCreateClassPlan: state.form['create-classplan'] ? state.form['create-classplan'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    user,
  });
};

const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listTopics: param => dispatch(listTopics(param)),
  listTeachingYearFilters: param => dispatch(listTeachingYearFilters(param)),
  resetTopicList: () => dispatch(resetTopicList()),
  prepareForm: () => {
    dispatch(initialize('create-classplan', {
      topics: [],
    }));
  },
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },

  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

  // removeSelectedObjectToClassPlan: idObject => dispatch(removeSelectedObjectToClassPlan(idObject)),
  // resetSelectedObjects: () => dispatch(resetSelectedObjects()),
  onSubmit: (values, d, props) => {
    const errors = [];
    const newClassPlan = {
      statement: values.statement,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
      topics_ids: values.topics.map(topic => topic.id),
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      learning_objects_ids: props.selectedObjectList.map(object => object.id),
    };


    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    return dispatch(createClassPlan(newClassPlan));
  },
});

const CreateClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-classplan',
})(CreateClassPlanPage));

export default CreateClassPlanPageContainer;
