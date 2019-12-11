import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, classifyQuestion } from 'actions/questionAction';
import { updateLearningObject } from 'actions/learningObjectAction';
import { listTopicSuggestions } from 'actions/suggestionAction';

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
    topicSuggestions: state.suggestion.topicSuggestions,
    idRemovedQuestion: state.document.idRemovedQuestion,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),

  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
  onSubmit: (values, d, props) => {
    const newUpdateQuestion = {
      id: props.activeQuestion.id,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : null,
      topics_ids: values.topics.map(topic => topic.id),
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
