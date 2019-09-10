import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import CreateQuestionPage from 'pages/Question/CreateQuestionPage';
import { createQuestion, removeSelectedObjectToQuestion, resetSelectedObjects } from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
} from 'actions/filterAction';
import { listTopics, resetTopicList } from 'actions/topicAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('question-create');
  return ({
    topics: selector(state, 'topics'),
    alternatives: selector(state, 'alternatives'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    sourceFilters: state.filter.sourceFilters,
    selectedObjectList: state.question.selectedObjectList,
  });
};

const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listTopics: param => dispatch(listTopics(param)),
  resetTopicList: () => dispatch(resetTopicList()),
  prepareForm: () => {
    dispatch(initialize('question-create', {
      topics: [{}],
      alternatives: [{}, {}, {}],
      selectedIndex: 0,
    }));
  },
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },

  removeSelectedObjectToQuestion: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
  resetSelectedObjects: () => dispatch(resetSelectedObjects()),
  onSubmit: (values, d, props) => {
    const errors = [];
    const newQuestion = {
      statement: values.statement,
      tags: values.tags.split(',').map(tag => tag.trim()),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
      alternatives: values.alternatives.map((alternative, i) => ({
        is_correct: (i === values.selectedIndex),
        text: alternative.alternativeText,
      })),
      source_id: values.source !== '0' ? values.source : null,
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      year: values.year,
      learning_objects_ids: props.selectedObjectList.map(object => object.id),
      resolution: values.resolution,
    };

    if (newQuestion && (newQuestion.statement.trim() === '<p></p>' || newQuestion.statement.trim() === '')) {
      errors.statement = 'Campo obrigatório. Insira o enunciado';
    }

    // validations
    if (newQuestion && newQuestion.alternatives.filter(alternative => alternative.is_correct === true).length === 0) {
      errors.isCorrect = 'Campo obrigatório. Selecione uma resposta correta';
    }

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    return dispatch(createQuestion(newQuestion));
  },
});

const CreateQuestionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-create',
})(CreateQuestionPage));

export default CreateQuestionPageContainer;
