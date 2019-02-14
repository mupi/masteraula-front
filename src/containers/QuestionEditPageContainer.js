import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, updateQuestion } from 'actions/questionAction';
import { listTopics } from 'actions/topicAction';

import { toggleModal, addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  activeQuestion: state.question.activeQuestion,
  modal: state.document.modal,
  activeDocument: state.document.activeDocument,
  topicsList: state.topic.topics,
});


const mapDispatchToProps = dispatch => ({
  fetchQuestion: id => dispatch(fetchQuestion(id)),
  toggleModal: (modal, idQuestion) => dispatch(toggleModal(modal, idQuestion)),
  addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
  removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
  listTopics: param => dispatch(listTopics(param)),
  onSubmit:( values, d,props) => {

    const newUpdateQuestion = {
      id: props.activeQuestion.id,
      tags: values.tags.split(','),
   //   topics_ids: values.,
      difficulty: values.difficulty,
    };
    //dispatch(updateLearningObject)
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
