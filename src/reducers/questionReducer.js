import {
  FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE,
  RATE_QUESTION,
  LIST_QUESTION_PAGE, LIST_QUESTION_PAGE_SUCCESS, LIST_QUESTION_PAGE_FAILURE,
  LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS, LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS,
} from 'actions/questionAction';

const sessionData = JSON.parse(localStorage.getItem('activeDocument'));

const initialState = {
  activeQuestion: {},
  questionPage: {},
  activeDocument: sessionData,
};

export const question = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        activeQuestion: action.activeQuestion,
        isFetching: false,
      });
    case FETCH_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case LIST_QUESTION_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page,
        isFetching: true,
        error: null,
      });
    case LIST_QUESTION_PAGE_SUCCESS:
      return Object.assign({}, state, {
        questionPage: action.questionPage,
        isFetching: false,
      });
    case LIST_QUESTION_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case RATE_QUESTION:
      return Object.assign({}, state, {
        rating: action.rating,
      });
    case LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS: {
      const activeDocument = JSON.parse(localStorage.getItem('activeDocument'));
      const documentAdded = {
        id: activeDocument.id,
        name: activeDocument.name,
      };
      const activeQuestion = { ...state.activeQuestion, documents: [...state.activeQuestion.documents, documentAdded] };
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
      return Object.assign({}, state, {
        activeQuestion,
      });
    }
    case LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS: {
      const activeDocument = JSON.parse(localStorage.getItem('activeDocument'));
      const newDocumentList = state.activeQuestion.documents.filter(item => item.id !== activeDocument.id);
      const activeQuestion = { ...state.activeQuestion, documents: newDocumentList };
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));  
      return Object.assign({}, state, {
        activeQuestion,
      });
    }
    default:
      return state;
  }
};

export default question;
