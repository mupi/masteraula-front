import {
  FETCH_BASE_DOCUMENT, FETCH_BASE_DOCUMENT_SUCCESS, FETCH_BASE_DOCUMENT_FAILURE,
  FETCH_ONLINE_TEST, FETCH_ONLINE_TEST_SUCCESS, FETCH_ONLINE_TEST_FAILURE,
  CREATE_ONLINE_TEST, CREATE_ONLINE_TEST_SUCCESS, CREATE_ONLINE_TEST_FAILURE,
  UPDATE_ONLINE_TEST, UPDATE_ONLINE_TEST_SUCCESS, UPDATE_ONLINE_TEST_FAILURE,
  LIST_MY_ONLINE_TESTS, LIST_MY_ONLINE_TESTS_SUCCESS, LIST_MY_ONLINE_TESTS_FAILURE,
  DELETE_ONLINE_TEST, DELETE_ONLINE_TEST_SUCCESS, DELETE_ONLINE_TEST_FAILURE,
  VERIFY_ONLINE_TEST, VERIFY_ONLINE_TEST_SUCCESS, VERIFY_ONLINE_TEST_FAILURE,
  FETCH_STUDENT_ONLINE_TEST, FETCH_STUDENT_ONLINE_TEST_SUCCESS, FETCH_STUDENT_ONLINE_TEST_FAILURE,
  SEND_ANSWERS_ONLINE_TEST, SEND_ANSWERS_ONLINE_TEST_SUCCESS, SEND_ANSWERS_ONLINE_TEST_FAILURE,
  SET_START_DATE_ONLINE_TEST,
} from 'actions/onlineTestAction';
import { toast } from 'react-toastify';

const initialState = {
  baseDocument: null,
  activeOnlineTest: null,
  onlineTestsList: [],
  isFetchingBaseDocument: false,
  isFetchingOnlineTest: false,
  basicStudentOnlineTest: null,
  fullStudentOnlineTest: null,
  answersSent: false,
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const onlineTest = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BASE_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingBaseDocument: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_BASE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        baseDocument: action.baseDocument,
        isFetchingBaseDocument: false,
      });
    case FETCH_BASE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingBaseDocument: false,
        baseDocument: null,
        error: action.error,
      });
    case FETCH_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingOnlineTest: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        activeOnlineTest: action.activeOnlineTest,
        isFetchingOnlineTest: false,
      });
    case FETCH_ONLINE_TEST_FAILURE:
      return Object.assign({}, state, {
        isFetchingOnlineTest: false,
        error: action.error,
        activeOnlineTest: null,
      });
    case FETCH_STUDENT_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingFullStudentOnlineTest: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_STUDENT_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        fullStudentOnlineTest: action.fullStudentOnlineTest,
        isFetchingFullStudentOnlineTest: false,
      });
    case FETCH_STUDENT_ONLINE_TEST_FAILURE:
      return Object.assign({}, state, {
        isFetchingFullStudentOnlineTest: false,
        error: action.error,
        fullStudentOnlineTest: null,
      });
    case VERIFY_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingBasicStudentOnlineTest: true,
        error: null,
        isDeleted: false,
      });
    case VERIFY_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        basicStudentOnlineTest: action.basicStudentOnlineTest,
        isFetchingBasicStudentOnlineTest: false,
      });
    case VERIFY_ONLINE_TEST_FAILURE:
      return Object.assign({}, state, {
        isFetchingBasicStudentOnlineTest: false,
        error: action.error,
        basicStudentOnlineTest: null,
      });
    case SEND_ANSWERS_ONLINE_TEST:
      return Object.assign({}, state, {
        isSendingAnswers: true,
        error: null,
        answersSent: false,
      });
    case SEND_ANSWERS_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        isSendingAnswers: false,
        answersSent: true,
      });
    case SEND_ANSWERS_ONLINE_TEST_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isSendingAnswers: false,
        error: action.error,
        answersSent: false,
      });
    case SET_START_DATE_ONLINE_TEST:
      return Object.assign({}, state, {
        startDateOnlineTest: new Date(),
      });
    case CREATE_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeOnlineTest: action.newOnlineTest,
        isFetching: false,
      });
    case CREATE_ONLINE_TEST_SUCCESS:
      // toast.success('Prova online atualizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeOnlineTest: action.newOnlineTest,
        isFetching: false,
      });
    case CREATE_ONLINE_TEST_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case LIST_MY_ONLINE_TESTS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingOnlineTests: true,
        currentPage: action.page,
        error: null,
        isDeleted: false,
        orderField: action.orderField,
        order: action.order,
      });
    case LIST_MY_ONLINE_TESTS_SUCCESS:
      return Object.assign({}, state, {
        onlineTestsList: action.onlineTestsList,
        isFetchingOnlineTests: false,
      });
    case LIST_MY_ONLINE_TESTS_FAILURE:
      return Object.assign({}, state, {
        onlineTestsList: null,
        isFetchingOnlineTests: false,
        error: action.errorMessage,
      });
    case UPDATE_ONLINE_TEST: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_ONLINE_TEST_SUCCESS: {
      toast.success('Prova online atualizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeOnlineTest: { ...action.activeOnlineTest },
        isUpdated: true,
      });
    }
    case UPDATE_ONLINE_TEST_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case DELETE_ONLINE_TEST: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_ONLINE_TEST_SUCCESS: {
      toast.success('Prova Online removida com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        // classPlans: newClassPlans,
        isDeleted: true,
      });
    }
    case DELETE_ONLINE_TEST_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    default:
      return state;
  }
};

export default onlineTest;
