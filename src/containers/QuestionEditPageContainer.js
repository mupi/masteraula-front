import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, updateQuestion } from 'actions/questionAction';
import { listTopics } from 'actions/topicAction';
import { updateLearningObject } from 'actions/learningObjectAction';


import { toggleModal, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';

const mapStateToProps = (state) => {
  const selector = formValueSelector('question-edit');
  return ({
    topics: selector(state, 'topics'),
    isFetching: state.question.isFetching,
    activeQuestion: state.question.activeQuestion,
    modal: state.document.modal,
    activeDocument: state.document.activeDocument,
    topicsList: state.topic.topics,
  });
};

const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
  listTopics: param => dispatch(listTopics(param)),
  onSubmit: (values, d, props) => {
    const newUpdateQuestion = {
      id: props.activeQuestion.id,
      tags: values.tags.split(','),
      topics_ids: values.topics.map((topic) => {
        if (topic && topic.topic) return topic.topic;
        if (topic && topic.subsubject) return topic.subsubject;
        if (topic && topic.subject) return topic.subject;
        return null;
      }).filter(topic => topic != null),
      difficulty: values.difficulty,
    };

    const newLearningObjects = [{
      id: 10,
      tags: ['X', 'AB'],
    },
    {
      id: 21,
      tags: ['D', 'F'],
    },
    ];

    let i;
    for (i = 0; i < newLearningObjects.length; i += 1) {
      dispatch(updateLearningObject(newLearningObjects[i]));
    }

    return dispatch(updateQuestion(newUpdateQuestion));
  },
});

const QuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-edit',
})(QuestionEditPage));

export default QuestionEditPageContainer;
