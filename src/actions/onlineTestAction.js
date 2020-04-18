import { documentService } from 'services';
import { history } from 'helpers';
import { initialize } from 'redux-form';
import onlineTestService from 'services/onlineTestService';
import { toast } from 'react-toastify';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};
// Load BASE DOCUMENT
export const FETCH_BASE_DOCUMENT = 'FETCH_BASE_DOCUMENT';
export const FETCH_BASE_DOCUMENT_SUCCESS = 'FETCH_BASE_DOCUMENT_SUCCESS';
export const FETCH_BASE_DOCUMENT_FAILURE = 'FETCH_BASE_DOCUMENT_FAILURE';


// Load single ONLINE TEST
export const FETCH_ONLINE_TEST = 'FETCH_ONLINE_TEST';
export const FETCH_ONLINE_TEST_SUCCESS = 'FETCH_ONLINE_TEST_SUCCESS';
export const FETCH_ONLINE_TEST_FAILURE = 'FETCH_ONLINE_TEST_FAILURE';

// Create new ONLINE TEST
export const CREATE_ONLINE_TEST = 'CREATE_ONLINE_TEST';
export const CREATE_ONLINE_TEST_SUCCESS = 'CREATE_ONLINE_TEST_SUCCESS';
export const CREATE_ONLINE_TEST_FAILURE = 'CREATE_ONLINE_TEST_FAILURE';
export const RESET_NEW_ONLINE_TEST = 'RESET_NEW_ONLINE_TEST';

// Update ONLINE TEST
export const UPDATE_ONLINE_TEST = 'UPDATE_ONLINE_TEST';
export const UPDATE_ONLINE_TEST_SUCCESS = 'UPDATE_ONLINE_TEST_SUCCESS';
export const UPDATE_ONLINE_TEST_FAILURE = 'UPDATE_ONLINE_TEST_FAILURE';
export const RESET_UPDATE_ONLINE_TEST = 'RESET_UPDATE_ONLINE_TEST';

// Delete ONLINE TEST
export const DELETE_ONLINE_TEST = 'DELETE_ONLINE_TEST';
export const DELETE_ONLINE_TEST_SUCCESS = 'DELETE_ONLINE_TEST_SUCCESS';
export const DELETE_ONLINE_TEST_FAILURE = 'DELETE_ONLINE_TEST_FAILURE';
export const RESET_DELETE_ONLINE_TEST = 'RESET_DELETE_ONLINE_TEST';

// List my ONLINE TESTS
export const LIST_MY_ONLINE_TESTS = 'LIST_MY_ONLINE_TESTS';
export const LIST_MY_ONLINE_TESTS_SUCCESS = 'LIST_MY_ONLINE_TESTS_SUCCESS';
export const LIST_MY_ONLINE_TESTS_FAILURE = 'LIST_MY_ONLINE_TESTS_FAILURE';

// Copy ONLINE TEST
export const COPY_ONLINE_TEST = 'COPY_ONLINE_TEST';
export const COPY_ONLINE_TEST_SUCCESS = 'COPY_ONLINE_TEST_SUCCESS';
export const COPY_ONLINE_TEST_FAILURE = 'COPY_ONLINE_TEST_FAILURE';


export const fetchBaseDocument = id => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BASE_DOCUMENT });
    const baseDocument = await onlineTestService.fetchBaseDocument(id);
    dispatch({ type: FETCH_BASE_DOCUMENT_SUCCESS, baseDocument });

    const newQuestions = baseDocument.questions.map(q => ({
      id: q.question.id,
      score: 0,
    }));
    dispatch(initialize('create-onlinetest', {
      typeDuration: 'R',
      questions_document: newQuestions,
    }));
  } catch {
    dispatch({ type: FETCH_BASE_DOCUMENT_FAILURE });
  }
};

export const fetchOnlineTest = id => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ONLINE_TEST });
    const activeOnlineTest = await onlineTestService.fetchOnlineTest(id);
    dispatch({ type: FETCH_ONLINE_TEST_SUCCESS, activeOnlineTest });

    // initialize online Test Edit Page for owner's
    dispatch(initialize('edit-onlinetest', {
      name: activeOnlineTest.name,
      duration: activeOnlineTest.duration,
      start_date: activeOnlineTest.start_date,
      finish_date: activeOnlineTest.finish_date,
      typeDuration: activeOnlineTest.duration ? 'R' : 'L',
      questions_document: activeOnlineTest.questions_document.map(q => ({ id: q.id, score: q.score })),
    }));
  } catch {
    dispatch({ type: FETCH_ONLINE_TEST_FAILURE });
  }
};

// Create a new online test
export const createOnlineTest = (newOnlineTestData, idDocBase) => {
  function createNewOnlineTest() { return { type: CREATE_ONLINE_TEST }; }
  function createOnlineTestSuccess(newOnlineTest) { return { type: CREATE_ONLINE_TEST_SUCCESS, newOnlineTest }; }
  function createOnlineTestFailure(error) { return { type: CREATE_ONLINE_TEST_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewOnlineTest(newOnlineTestData));
    return onlineTestService.createOnlineTest(newOnlineTestData, idDocBase).then(
      (newOnlineTest) => {
        dispatch(createOnlineTestSuccess(newOnlineTest));
        history.push(`/view-online/${newOnlineTest.link}`);
        toast.success('Prova online criada com sucesso', optionsSuccess);
      },
      (error) => {
        dispatch(createOnlineTestFailure(error));
      },
    );
  };
};

// Update an active Online Test
export const updateOnlineTest = (idOnlineTest, updatedOnlineTest) => {
  function updateActiveOnlineTest() { return { type: UPDATE_ONLINE_TEST }; }
  function updateOnlineTestSuccess(activeOnlineTest) { return { type: UPDATE_ONLINE_TEST_SUCCESS, activeOnlineTest }; }
  function updateOnlineTestFailure(error) { return { type: UPDATE_ONLINE_TEST_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveOnlineTest());
    return onlineTestService.updateOnlineTest(idOnlineTest, updatedOnlineTest).then(
      (activeOnlineTest) => {
        dispatch(updateOnlineTestSuccess(activeOnlineTest));
        dispatch(initialize('edit-onlinetest', {
          name: activeOnlineTest.name,
          duration: activeOnlineTest.duration,
          start_date: activeOnlineTest.start_date,
          finish_date: activeOnlineTest.finish_date,
          typeDuration: activeOnlineTest.duration ? 'R' : 'L',
          questions_document: activeOnlineTest.questions_document.map(q => ({ id: q.id, score: q.score })),
        }));
      },
      (error) => {
        dispatch(updateOnlineTestFailure(error));
      },
    );
  };
};

// listMyDocuments using filters - v2019
export const listMyOnlineTests = (idDocBase, page, orderField = null, order = null) => {
  function requestOnlineTestPage() {
    return {
      type: LIST_MY_ONLINE_TESTS, page, orderField, order,
    };
  }
  function fetchMyOnlineTestPageSuccess(onlineTestsList) { return { type: LIST_MY_ONLINE_TESTS_SUCCESS, onlineTestsList }; }
  function fetchMyOnlineTestPageFailure(errorMessage) { return { type: LIST_MY_ONLINE_TESTS_FAILURE, errorMessage }; }
  return (dispatch) => {
    dispatch(requestOnlineTestPage());
    return onlineTestService.listMyOnlineTest(idDocBase, page)
      .then(
        (onlineTestsList) => {
          dispatch(fetchMyOnlineTestPageSuccess(onlineTestsList));
        },
        (error) => {
          dispatch(fetchMyOnlineTestPageFailure(error));
          history.push(`/online-tests/${idDocBase}/1`);
        },
      );
  };
};

export const deleteOnlineTest = (idOnlineTest, isRedirect = false, idBaseDocument) => {
  function deleteSelectedOnlineTest() { return { type: DELETE_ONLINE_TEST }; }
  function deleteOnlineTestSuccess(idOnlineTestRemoved) { return { type: DELETE_ONLINE_TEST_SUCCESS, idOnlineTestRemoved }; }
  function deleteOnlineTestFailure(error) { return { type: DELETE_ONLINE_TEST_FAILURE, error }; }
  return (dispatch) => {
    dispatch(deleteSelectedOnlineTest(idOnlineTest));
    return onlineTestService.deleteOnlineTest(idOnlineTest)
      .then(
        (idOnlineTestRemoved) => {
          dispatch(deleteOnlineTestSuccess(idOnlineTestRemoved));
          if (isRedirect) {
            history.push(`/online-tests/${idBaseDocument}/1`);
          }
        },
        (error) => {
          dispatch(deleteOnlineTestFailure(error));
        },
      );
  };
};

export const copyOnlineTest = (props, isRedirect = false) => {
  function copySelectedOnlineTest() { return { type: COPY_ONLINE_TEST }; }
  function copySelectedOnlineTestSuccess(activeDocument) { return { type: COPY_ONLINE_TEST_SUCCESS, activeDocument }; }
  function copySelectedOnlineTestFailure(error) { return { type: COPY_ONLINE_TEST_FAILURE, error }; }
  return (dispatch) => {
    dispatch(copySelectedOnlineTest(props));
    return documentService.copyDocument(props).then(
      (activeDocument) => {
        dispatch(copySelectedOnlineTestSuccess(activeDocument));
        if (isRedirect) history.push('/edit-document');
      },
      (error) => {
        dispatch(copySelectedOnlineTestFailure(error));
      },
    );
  };
};
