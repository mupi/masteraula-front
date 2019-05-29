import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import CreateQuestionPage from 'pages/Question/CreateQuestionPage';
import { updateQuestion } from 'actions/questionAction';


const mapStateToProps = (state) => {
  const selector = formValueSelector('question-edit');
  return ({
    topics: selector(state, 'topics'),
    topicsList: state.topic.topics,
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (values, d, props) => {
    const newQuestion = {
      tags: values.tags.split(',').map(tag => tag.trim()),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
    };


    return dispatch(updateQuestion(newQuestion));
  },
});

const CreateQuestionPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-create',
})(CreateQuestionPage));

export default CreateQuestionPageContainer;
