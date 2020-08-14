import { questionService } from 'services';
import { history } from 'helpers';
import { toast } from 'react-toastify';
import { initialize } from 'redux-form';
import { listTopics } from 'actions/topicAction';
import { listTopicFilters } from 'actions/filterAction';

// Load single question
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';

// Create new question
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

// Classify question
export const CLASSIFY_QUESTION = 'CLASSIFY_QUESTION';
export const CLASSIFY_QUESTION_SUCCESS = 'CLASSIFY_QUESTION_SUCCESS';
export const CLASSIFY_QUESTION_FAILURE = 'CLASSIFY_QUESTION_FAILURE';
export const RESET_CLASSIFY_QUESTION = 'RESET_CLASSIFY_QUESTION';

// Update question
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';
export const RESET_UPDATE_QUESTION = 'RESET_UPDATE_QUESTION';

// Delete question
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';
export const RESET_DELETE_QUESTION = 'RESET_DELETE_QUESTION';

// Star rating question
export const RATE_QUESTION = 'RATE_QUESTION';

// List questions
export const LIST_QUESTION_PAGE = 'LIST_QUESTION_PAGE';
export const LIST_QUESTION_PAGE_SUCCESS = 'LIST_QUESTION_PAGE_SUCCESS';
export const LIST_QUESTION_PAGE_FAILURE = 'LIST_QUESTION_PAGE_FAILURE';

// Fetch documents that belong to question
export const LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS';
export const LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS';

// Add and Remove selected object to question
export const ADD_SELECTED_OBJECT_QUESTION = 'ADD_SELECTED_OBJECT_QUESTION';
export const REMOVE_SELECTED_OBJECT_QUESTION = 'REMOVE_SELECTED_OBJECT_QUESTION';
export const RESET_SELECTED_OBJECTLIST_QUESTION = 'RESET_SELECTED_OBJECTLIST_QUESTION';

export const ADD_SELECTED_LABEL_QUESTION_CARD = 'ADD_SELECTED_LABEL_QUESTION_CARD';
export const REMOVE_SELECTED_LABEL_QUESTION_CARD = 'REMOVE_SELECTED_LABEL_QUESTION_CARD';
export const REMOVE_SELECTED_LABEL_QUESTION_CARD_AFTER_DELETING_LABEL = 'REMOVE_SELECTED_LABEL_QUESTION_CARD_AFTER_DELETING_LABEL';

export const ADD_SELECTED_LABEL_ACTIVE_QUESTION = 'ADD_SELECTED_LABEL_ACTIVE_QUESTION';
export const REMOVE_SELECTED_LABEL_ACTIVE_QUESTION = 'REMOVE_SELECTED_LABEL_ACTIVE_QUESTION';

export const ADD_SELECTED_LABEL_RELATED_QUESTION = 'ADD_SELECTED_LABEL_RELATED_QUESTION';
export const REMOVE_SELECTED_LABEL_RELATED_QUESTION = 'REMOVE_SELECTED_LABEL_RELATED_QUESTION';
export const REMOVE_SELECTED_LABEL_RELATED_QUESTION_AFTER_DELETING_LABEL = 'REMOVE_SELECTED_LABEL_RELATED_QUESTION_AFTER_DELETING_LABEL';

// Set object that will added in new Question - Create question based on selected object
export const SET_OBJECT_TO_NEW_QUESTION = 'SET_OBJECT_TO_NEW_QUESTION';

// List questions from modal
export const LIST_QUESTION_MODAL = 'LIST_QUESTION_MODAL';
export const LIST_QUESTION_MODAL_SUCCESS = 'LIST_QUESTION_MODAL_SUCCESS';
export const LIST_QUESTION_MODAL_FAILURE = 'LIST_QUESTION_MODAL_FAILURE';
export const SET_CURRENT_PAGE_MODAL = 'SET_CURRENT_PAGE_MODAL';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const fetchQuestion = (id) => {
  function requestQuestion() { return { type: FETCH_QUESTION }; }
  function fetchQuestionSuccess(activeQuestion) { return { type: FETCH_QUESTION_SUCCESS, activeQuestion }; }
  function fetchQuestionFailure(error) { return { type: FETCH_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestQuestion(id));
    return questionService.fetchQuestion(id)
      .then(
        (activeQuestion) => {
          let alternatives = [{}, {}, {}];
          let selectedAlternative = 0;

          if (activeQuestion.alternatives && activeQuestion.alternatives.length > 0) {
            alternatives = activeQuestion.alternatives.map((alternative, i) => ({
              id: alternative.id,
              alternativeText: alternative.text,
              selectIndex: (alternative.is_correct ? i : ''),
            }));
            selectedAlternative = alternatives.filter(item => item.selectIndex !== '')[0].selectIndex;
          }

          const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
            id: lobj.id,
            tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
          }));

          // initialize Question Edit Page for users with Editor role
          dispatch(initialize('classify-question', {
            difficulty: activeQuestion.difficulty,
            learning_objects: newLearningObjectList,
            tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
            topics: activeQuestion.topics,
          }));

          // initialize My Question Edit Page for owner's question
          dispatch(initialize('edit-question', {
            year: activeQuestion.year,
            source: activeQuestion.source,
            statement: activeQuestion.statement,
            difficulty: activeQuestion.difficulty,
            disciplines: activeQuestion.disciplines,
            teachingLevels: activeQuestion.teaching_levels,
            learning_objects: newLearningObjectList,
            tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
            topics: activeQuestion.topics,
            alternatives,
            selectedIndex: selectedAlternative,
            resolution: activeQuestion.resolution,
            sourceQuestion: activeQuestion.source ? 'V' : 'A',
            secret: activeQuestion.secret ? 'S' : 'P',
          }));
          dispatch(listTopics(activeQuestion.disciplines));
          dispatch(fetchQuestionSuccess(activeQuestion));
        },
        (error) => {
          dispatch(fetchQuestionFailure(error));
          history.push('/question-base/1');
        },
      );
  };
};


// Function: Create a new question
export const createQuestion = (props) => {
  function createNewQuestion() { return { type: CREATE_QUESTION }; }
  function createQuestionSuccess(newQuestion) { return { type: CREATE_QUESTION_SUCCESS, newQuestion }; }
  function createQuestionFailure(error) { return { type: CREATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewQuestion(props));
    return questionService.createQuestion(props).then(
      (newQuestion) => {
        dispatch(createQuestionSuccess(newQuestion));
        history.push(`/view-question/${newQuestion.id}`);
        toast.success('Questão criada com sucesso', optionsSuccess);
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(createQuestionFailure(error));
      },
    );
  };
};

// Function: Classify an active question
export const classifyQuestion = (props) => {
  function classifyActiveQuestion() { return { type: CLASSIFY_QUESTION }; }
  function classifyQuestionSuccess(activeQuestion) { return { type: CLASSIFY_QUESTION_SUCCESS, activeQuestion }; }
  function classifyQuestionFailure(error) { return { type: CLASSIFY_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(classifyActiveQuestion(props));
    return questionService.classifyQuestion(props).then(
      (activeQuestion) => {
        toast.success('Questão atualizada com sucesso', optionsSuccess);
        dispatch(classifyQuestionSuccess(activeQuestion));

        const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
          id: lobj.id,
          tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
        }));

        dispatch(initialize('classify-question', {
          difficulty: activeQuestion.difficulty,
          learning_objects: newLearningObjectList,
          tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
          topics: activeQuestion.topics,
        }));
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(classifyQuestionFailure(error));
      },
    );
  };
};


// Function: Update active question / available only for user's questions
export const updateQuestion = (props) => {
  function updateActiveQuestion() { return { type: UPDATE_QUESTION }; }
  function updateQuestionSuccess(activeQuestion) { return { type: UPDATE_QUESTION_SUCCESS, activeQuestion }; }
  function updateQuestionFailure(error) { return { type: UPDATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveQuestion(props));
    return questionService.updateQuestion(props).then(
      (activeQuestion) => {
        toast.success('Questão atualizada com sucesso', optionsSuccess);
        dispatch(updateQuestionSuccess(activeQuestion));

        const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
          id: lobj.id,
          tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
        }));

        let alternatives = [{}, {}, {}];
        let selectedAlternative = 0;

        if (activeQuestion.alternatives && activeQuestion.alternatives.length > 0) {
          alternatives = activeQuestion.alternatives.map((alternative, i) => ({
            id: alternative.id,
            alternativeText: alternative.text,
            selectIndex: (alternative.is_correct ? i : ''),
          }));
          selectedAlternative = alternatives.filter(item => item.selectIndex !== '')[0].selectIndex;
        }

        dispatch(initialize('edit-question', {
          year: activeQuestion.year,
          source: activeQuestion.source,
          statement: activeQuestion.statement,
          difficulty: activeQuestion.difficulty,
          disciplines: activeQuestion.disciplines,
          teachingLevels: activeQuestion.teaching_levels,
          learning_objects: newLearningObjectList,
          tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
          topics: activeQuestion.topics,
          alternatives,
          selectedIndex: selectedAlternative,
          resolution: activeQuestion.resolution,
          sourceQuestion: activeQuestion.source ? 'V' : 'A',
        }));
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);

        dispatch(updateQuestionFailure(error));
      },
    );
  };
};


// listQuestion using filters
export const listQuestions = (page, filter) => {
  function requestQuestionPage() { return { type: LIST_QUESTION_PAGE, page }; }
  function fetchQuestionPageSuccess(questionPage) { return { type: LIST_QUESTION_PAGE_SUCCESS, questionPage }; }
  function fetchQuestionPageFailure(error) { return { type: LIST_QUESTION_PAGE_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().question.isFetching) {
      return 1;
    }
    dispatch(listTopicFilters(filter));
    dispatch(requestQuestionPage());
    return questionService.listQuestions(page, filter)
      .then(
        (questionPage) => {
          dispatch(fetchQuestionPageSuccess(questionPage));
          dispatch(initialize('questionSearch', {
            searchText: filter.searchText,
            onlyMyQuestions: filter.onlyMyQuestions,
          }));
        },
        (error) => {
          dispatch(fetchQuestionPageFailure(error));
          dispatch(initialize('questionSearch', {
            searchText: filter.searchText,
          }));
          history.push('/question-base/1');
        },
      );
  };
};

// Function: Delete a question
export const deleteQuestion = (idQuestion) => {
  function deleteSelectedQuestion() { return { type: DELETE_QUESTION }; }
  function deleteSelectedQuestionSuccess(idQuestionRemoved) { return { type: DELETE_QUESTION_SUCCESS, idQuestionRemoved }; }
  function deleteSelectedQuestionFailure(error) { return { type: DELETE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(deleteSelectedQuestion(idQuestion));
    return questionService.deleteQuestion(idQuestion).then(
      (idQuestionRemoved) => {
        dispatch(deleteSelectedQuestionSuccess(idQuestionRemoved));
        history.push('/question-base/1');
        toast.success('Questão apagada com sucesso', optionsSuccess);
      },
      (error) => {
        dispatch(deleteSelectedQuestionFailure(error));
      },
    );
  };
};


export const rateQuestion = rating => ({
  type: RATE_QUESTION,
  rating,
});

// Add Selected Object to Question
export const addSelectedObjectToQuestion = selectedObject => ({
  type: ADD_SELECTED_OBJECT_QUESTION, selectedObject,
});

// Remove Selected Object to Question
export const removeSelectedObjectToQuestion = idObject => ({
  type: REMOVE_SELECTED_OBJECT_QUESTION, idObject,
});

export const resetSelectedObjects = () => ({
  type: RESET_SELECTED_OBJECTLIST_QUESTION,
});

// Functions for create question based on Object
export const setObjectIdToNewQuestion = objectId => ({
  type: SET_OBJECT_TO_NEW_QUESTION,
  objectIdAddedToQuestion: objectId,
});

// Add Selected Label to Question
export const addSelectedLabelToQuestionCard = (idQuestion, label) => ({
  type: ADD_SELECTED_LABEL_QUESTION_CARD, idQuestion, label,
});

// Remove Selected Label to Question
export const removeSelectedLabelFromQuestionCard = (idQuestion, idLabel) => ({
  type: REMOVE_SELECTED_LABEL_QUESTION_CARD, idQuestion, idLabel,
});

// Remove Label to questions that have label deleted
export const removeSelectedLabelFromQuestionCardAfterDeletingLabel = idLabel => ({
  type: REMOVE_SELECTED_LABEL_QUESTION_CARD_AFTER_DELETING_LABEL, idLabel,
});

// Add Selected Label to Question
export const addSelectedLabelToActiveQuestion = (idQuestion, label) => ({
  type: ADD_SELECTED_LABEL_ACTIVE_QUESTION, idQuestion, label,
});

// Remove Selected Label to Question
export const removeSelectedLabelFromActiveQuestion = (idQuestion, idLabel) => ({
  type: REMOVE_SELECTED_LABEL_ACTIVE_QUESTION, idQuestion, idLabel,
});

// Add Selected Label to Question
export const addSelectedLabelToRelatedQuestion = (idQuestion, label) => ({
  type: ADD_SELECTED_LABEL_RELATED_QUESTION, idQuestion, label,
});

// Remove Selected Label to Question
export const removeSelectedLabelFromRelatedQuestion = (idQuestion, idLabel) => ({
  type: REMOVE_SELECTED_LABEL_RELATED_QUESTION, idQuestion, idLabel,
});

// Remove Label to related questions that have label deleted
export const removeSelectedLabelFromRelatedQuestionAfterDeletingLabel = idLabel => ({
  type: REMOVE_SELECTED_LABEL_RELATED_QUESTION_AFTER_DELETING_LABEL, idLabel,
});

// List questions - Modal
export const listQuestionModal = (currentPageModal, filterQuestion) => {
  function requestQuestiontModal() { return { type: LIST_QUESTION_MODAL, currentPageModal }; }
  function requestQuestionModalSuccess(questionPageModal) { return { type: LIST_QUESTION_MODAL_SUCCESS, questionPageModal }; }
  function requestQuestionModalFailure(error) { return { type: LIST_QUESTION_MODAL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestQuestiontModal());
    return questionService.listQuestionModal(currentPageModal, filterQuestion).then(
      (questionPageModal) => {
        dispatch(requestQuestionModalSuccess(questionPageModal));
        dispatch(initialize('questionSearchModal', {
          searchText: filterQuestion && filterQuestion.searchTextModal ? filterQuestion.searchTextModal : '',
        }));
      }, (error) => {
        dispatch(requestQuestionModalFailure(error));
      },
    );
  };
};

// Set page for search question in modal
export const setCurrentPageModal = currentPageModal => ({
  type: SET_CURRENT_PAGE_MODAL, currentPageModal,
});
