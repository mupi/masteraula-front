import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import MyQuestionEditPage from 'pages/Question/MyQuestionEditPage';
import { fetchQuestion, updateMyQuestion } from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
} from 'actions/filterAction';
import { listTopics } from 'actions/topicAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('edit-question');
  const { user } = state.session.session;

  return ({
    topics: selector(state, 'topics'),
    alternatives: selector(state, 'alternatives'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    sourceFilters: state.filter.sourceFilters,
    isFetching: state.question.isFetching,
    activeQuestion: state.question.activeQuestion,
    userId: user.id,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listTopics: param => dispatch(listTopics(param)),
  prepareForm: () => {
    dispatch(initialize('edit-question', {
      topics: [{}],
      alternatives: [{}, {}, {}],
    }));
  },

  onSubmit: (values, d, props) => {
    const errors = [];
    const myUpdatedQuestion = {
      statement: values.statement,
      tags: values.tags.split(',').map(tag => tag.trim()),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
      alternatives: values.alternatives.map(alternative => ({
        is_correct: (alternative.isCorrect === 'true'),
        text: alternative.alternativeText,
      })),
      source_id: values.source !== '0' ? values.source : null,
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      year: values.year,
    };

    if (myUpdatedQuestion && (myUpdatedQuestion.statement.trim() === '<p></p>' || myUpdatedQuestion.statement.trim() === '')) {
      errors.statement = 'Campo obrigatório. Insira o enunciado';
    }
    // validations
    if (myUpdatedQuestion && myUpdatedQuestion.alternatives.filter(alternative => alternative.is_correct === true).length === 0) {
      errors.isCorrect = 'Campo obrigatório. Selecione uma resposta correta';
    }

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    return dispatch(updateMyQuestion(myUpdatedQuestion)); 
  },
});

const MyQuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-question',
})(MyQuestionEditPage));

export default MyQuestionEditPageContainer;
