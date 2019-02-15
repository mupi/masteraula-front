import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, updateQuestion } from 'actions/questionAction';
import { listTopics } from 'actions/topicAction';
import { updateLearningObjectList, updateLearningObject } from 'actions/learningObjectAction';


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
      difficulty: values.difficulty,
      topics_ids: [1, 2],
    };

    const newLearningObjects =[ { 
      id: 10,
      tags: ["NUEVO TAG1","NUEVO TAG2"]},
      { 
        id: 21,
        tags: ["NUEVO TAG3","NUEVO TAG4"]},
    ]

    const singleObject = { 
      id: 10,
      tags: ["POCOYOOO TAG1","NUEVO TAG2"]};
   // dispatch(updateLearningObjectList(newLearningObjects));

   let i;
   for (i = 0; i < newLearningObjects.length; i += 1) {
    dispatch(updateLearningObject(newLearningObjects[i]));
     console.log("aqii" + i);
   }
  //  dispatch(updateLearningObject(singleObject));

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
