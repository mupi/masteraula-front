import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, classifyQuestion } from 'actions/questionAction';
import { updateLearningObject } from 'actions/learningObjectAction';


import { addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('classify-question');
  const { user } = state.session.session;

  return ({
    topics: selector(state, 'topics'),
    isFetching: state.question.isFetching,
    activeQuestion: state.question.activeQuestion,
    modal: state.document.modal,
    activeDocument: state.document.activeDocument,
    topicsList: state.topic.topics,
    role: state.session.session.user.groups,
    userId: user.id,
    idRemovedQuestion: state.document.idRemovedQuestion,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
  onSubmit: (values, d, props) => {
    const newUpdateQuestion = {
      id: props.activeQuestion.id,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : null,
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic && parseInt(topic.topic, 10) > 0) return topic.topic;
        if (topic && topic.subsubject && parseInt(topic.subsubject, 10) > 0) return topic.subsubject;
        if (topic && topic.subject && parseInt(topic.subject, 10) > 0) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty !== 'NaN' ? values.difficulty : null,
    };


    const newLearningObjects = values.learning_objects.map(lobj => ({
      id: lobj.id,
      tags: lobj.tags.split(',').map(tag => tag.trim()),
    }));


    let i;
    for (i = 0; i < newLearningObjects.length; i += 1) {
      dispatch(updateLearningObject(newLearningObjects[i], false));
    }

    return dispatch(classifyQuestion(newUpdateQuestion));
  },
});

const QuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'classify-question',
})(QuestionEditPage));

export default QuestionEditPageContainer;
