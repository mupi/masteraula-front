import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import QuestionEditPage from 'pages/Question/QuestionEditPage';
import { fetchQuestion, classifyQuestion } from 'actions/questionAction';
import { updateLearningObject } from 'actions/learningObjectAction';
import { listTopicSuggestions } from 'actions/suggestionAction';
import {
  addSelectedMyQuestionLabelFilter,
} from 'actions/filterAction';
import { addSelectedQuestion, removeSelectedQuestion } from 'actions/documentAction';
import {
  addSelectedLabelToQuestion, removeSelectedLabelFromQuestion, RELATED_FROM, createMyQuestionLabel,
} from 'actions/labelAction';
import { showModal, hideModal } from 'actions/modalAction';

import { history } from 'helpers';

const toggleApplyLabelToQuestion = (idQuestion, idLabel, value) => (value
  ? addSelectedLabelToQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION)
  : removeSelectedLabelFromQuestion(idQuestion, idLabel, RELATED_FROM.QUESTION));

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
    labels: state.label.myQuestionLabels,
    isAddingRemovingLabel: state.label.isAddingRemovingLabel,
  });
};

const mapDispatchToProps = (dispatch) => {
  const addMyQuestionLabelFilter = (label) => {
    history.replace('/question-base/1');
    return dispatch(addSelectedMyQuestionLabelFilter(label));
  };

  /* Options for Labels */
  const createMyQuestionLabelModalProps = {
    modalProps: {
      open: true,
      title: 'Criar etiqueta',
      nameAction: 'Criar',
      submit: (values) => {
        dispatch(createMyQuestionLabel(values));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  };


  return {
    fetchQuestion: id => dispatch(fetchQuestion(id)),

    listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),

    addSelectedQuestion: (idDocument, idQuestion, order) => dispatch(addSelectedQuestion(idDocument, idQuestion, order)),
    removeSelectedQuestion: (idDocument, idQuestion) => dispatch(removeSelectedQuestion(idDocument, idQuestion)),
    onSubmit: (values, d, props) => {
      const newUpdateQuestion = {
        id: props.activeQuestion.id,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
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

    toggleApplyLabelToQuestion: (idQuestion, idLabel, value) => dispatch(toggleApplyLabelToQuestion(idQuestion, idLabel, value)),
    removeSelectedLabelFromQuestion: (idQuestion, idLabel) => dispatch(removeSelectedLabelFromQuestion(idQuestion, idLabel, true)),
    addSelectedMyQuestionLabelFilter: label => dispatch(addMyQuestionLabelFilter(label)),

    // Labels
    showCreateMyQuestionLabelModal: () => dispatch(showModal(createMyQuestionLabelModalProps)),
  };
};

const QuestionEditPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'classify-question',
})(QuestionEditPage));

export default QuestionEditPageContainer;
