import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError,
} from 'redux-form';
import MyQuestionEditPage from 'pages/Question/MyQuestionEditPage';
import {
  fetchQuestion, updateQuestion, removeSelectedObjectToQuestion, resetSelectedObjects,
} from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';

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
    // add object to question
    selectedObjectList: state.question.selectedObjectList,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listTopics: param => dispatch(listTopics(param)),
  resetTopicList: () => dispatch(resetTopicList()),
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },

  // add objects to question
  removeSelectedObjectToQuestion: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
  resetSelectedObjects: () => dispatch(resetSelectedObjects()),

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

    const myUpdatedQuestion = {
      id: props.activeQuestion.id,
      statement: values.statement,
      tags: values.tags.split(',').map(tag => tag.trim()),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
      alternatives: alternativesCleaned.length > 0 ? alternativesCleaned : null,
      // source_id: values.source !== '0' ? values.source : null,
      source: values.source,
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      year: values.year === '' ? null : values.year,
      // selected objects to question
      learning_objects_ids: props.selectedObjectList.map(object => object.id),
      resolution: values.resolution,
    };

    // validations
    if (myUpdatedQuestion && (myUpdatedQuestion.statement.trim() === '<p></p>' || myUpdatedQuestion.statement.trim() === '')) {
      errors.statement = 'Campo obrigatório. Insira o enunciado';
    }
    if (myUpdatedQuestion && myUpdatedQuestion.alternatives.length > 0) {
      if (myUpdatedQuestion && myUpdatedQuestion.alternatives.filter(alternative => alternative.is_correct === true).length === 0) {
        errors.isCorrect = 'Campo obrigatório. Selecione uma resposta correta';
      }
    }

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    return dispatch(updateQuestion(myUpdatedQuestion));
  },
});

const MyQuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-question',
})(MyQuestionEditPage));

export default MyQuestionEditPageContainer;
