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
    errorsEditQuestion: state.form['edit-question'] ? state.form['edit-question'].submitErrors : null,
    sourceQuestionValue: selector(state, 'sourceQuestion'),
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
      tags: values.tags.split(',').map(tag => tag.trim()),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
      alternatives: alternativesCleaned.length > 0 ? alternativesCleaned : [],
      // source_id: values.source !== '0' ? values.source : null,
      source: values.sourceQuestion === 'V' ? values.source.name : null,
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      year: values.year === '' || values.sourceQuestion === 'V' ? null : values.year,
      // selected objects to question
      learning_objects_ids: props.selectedObjectList.map(object => object.id),
      resolution: resolutionCleaned,
    };

    // validations
    if (myUpdatedQuestion && (myUpdatedQuestion.statement.trim() === '<p></p>' || myUpdatedQuestion.statement.trim() === '')) {
      errors.statement = 'Campo obrigatório. Insira o enunciado';
    }

    if (myUpdatedQuestion && !myUpdatedQuestion.alternatives && !myUpdatedQuestion.resolution) {
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
});

const MyQuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-question',
})(MyQuestionEditPage));

export default MyQuestionEditPageContainer;
