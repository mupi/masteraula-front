import { connect } from 'react-redux';
import {
  reduxForm, formValueSelector, SubmissionError, initialize,
} from 'redux-form';
import MyQuestionEditPage from 'pages/Question/MyQuestionEditPage';
import { createQuestion } from 'actions/questionAction';
import {
  listDisciplineFilters, listTeachingLevelFilters, listSourceFilters,
} from 'actions/filterAction';
import { listTopics } from 'actions/topicAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('question-create');
  return ({
    topics: selector(state, 'topics'),
    alternatives: selector(state, 'alternatives'),
    topicsList: state.topic.topics,
    disciplineFilters: state.filter.disciplineFilters,
    teachingLevelFilters: state.filter.teachingLevelFilters,
    sourceFilters: state.filter.sourceFilters,
  });
};

const validate = (values) => {
  const errors = {};

  if (!values.new_password && !values.password_confirmation && !values.old_password) {
    errors.new_password = ' Campo obrigatório';
    errors.password_confirmation = ' Campo obrigatório';
    errors.old_password = ' Campo obrigatório';
  }

  if (values.new_password) {
    if (values.new_password.length < 8) {
      errors.new_password = 'A nova senha deve conter no mínimo 8 caracteres';
    } else if (!isNaN(values.new_password)) {
      errors.new_password = 'A nova senha não deve conter apenas números';
    }
  }

  if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation) {
    errors.password_confirmation = 'Senha e confirmação não coincidem';
  }

  return errors;
};


const mapDispatchToProps = dispatch => ({
  listDisciplineFilters: param => dispatch(listDisciplineFilters(param)),
  listTeachingLevelFilters: param => dispatch(listTeachingLevelFilters(param)),
  listSourceFilters: param => dispatch(listSourceFilters(param)),
  listTopics: param => dispatch(listTopics(param)),
  prepareForm: () => {
    dispatch(initialize('question-create', {
      topics: [{}],
      alternatives: [{}, {}, {}],
    }));
  },

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
      alternatives: values.alternatives.map(alternative => ({
        is_correct: (alternative.isCorrect === 'true'),
        text: alternative.alternativeText,
      })),
      source_id: values.source !== '0' ? values.source : null,
      disciplines_ids: values.disciplines.map(discipline => discipline.id),
      teaching_levels_ids: values.teachingLevels.map(teachingLevel => teachingLevel.id),
      year: values.year,
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

const MyQuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'myquestion-edit',
  validate,
})(MyQuestionEditPage));

export default MyQuestionEditPageContainer;
