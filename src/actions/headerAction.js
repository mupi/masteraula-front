import { headerService } from 'services';
import { history } from 'helpers/history';

// Fetch header
export const FETCH_HEADER = 'FETCH_HEADER';
export const FETCH_HEADER_SUCCESS = 'FETCH_HEADER_SUCCESS';
export const FETCH_HEADER_FAILURE = 'FETCH_HEADER_FAILURE';

// Create new header
export const CREATE_HEADER = 'CREATE_HEADER';
export const CREATE_HEADER_SUCCESS = 'CREATE_HEADER_SUCCESS';
export const CREATE_HEADER_FAILURE = 'CREATE_HEADER_FAILURE';
export const RESET_NEW_HEADER = 'RESET_NEW_HEADER';

// Update header
export const UPDATE_HEADER = 'UPDATE_HEADER';
export const UPDATE_HEADER_SUCCESS = 'UPDATE_HEADER_SUCCESS';
export const UPDATE_HEADER_FAILURE = 'UPDATE_HEADER_FAILURE';
export const RESET_UPDATE_HEADER = 'RESET_UPDATE_HEADER';

// Delete header
export const DELETE_HEADER = 'DELETE_HEADER';
export const DELETE_HEADER_SUCCESS = 'DELETE_HEADER_SUCCESS';
export const DELETE_HEADER_FAILURE = 'DELETE_HEADER_FAILURE';
export const RESET_DELETE_HEADER = 'RESET_DELETE_HEADER';

// List my headers
export const LIST_MY_HEADERS = 'LIST_MY_HEADERS';
export const LIST_MY_HEADERS_SUCCESS = 'LIST_MY_HEADERS_SUCCESS';
export const LIST_MY_HEADERS_FAILURE = 'LIST_MY_HEADERS_FAILURE';


// Function 1: Fetch Header
export const fetchHeader = (id) => {
  function requestHeader() { return { type: FETCH_HEADER }; }
  function fetchHeaderSuccess(activeHeader) { return { type: FETCH_HEADER_SUCCESS, activeHeader }; }
  function fetchHeaderFailure(error) { return { type: FETCH_HEADER_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestHeader(id));
    return headerService.fetchHeader(id).then(
      (activeHeader) => {
        dispatch(fetchHeaderSuccess(activeHeader));
      }, (error) => {
        dispatch(fetchHeaderFailure(error));
      },
    );
  };
};

// Function 2: Create a new header
export const createHeader = (props) => {
  function createNewHeader() { return { type: CREATE_HEADER }; }
  function createHeaderSuccess(newHeader) { return { type: CREATE_HEADER_SUCCESS, newHeader }; }
  function createHeaderFailure(error) { return { type: CREATE_HEADER_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewHeader(props));
    return headerService.createHeader(props).then(
      (newHeader) => {
        dispatch(createHeaderSuccess(newHeader));
        history.push('/question-base/1');
      },
      (error) => {
        dispatch(createHeaderFailure(error));
      },
    );
  };
};

// Function 3: Update an active header
export const updateHeader = (props) => {
  function updateActiveHeader() { return { type: UPDATE_HEADER }; }
  function updateHeaderSuccess(activeHeader) { return { type: UPDATE_HEADER_SUCCESS, activeHeader }; }
  function updateHeaderFailure(error) { return { type: UPDATE_HEADER_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveHeader(props));
    return headerService.updateHeader(props).then(
      (activeHeader) => {
        dispatch(updateHeaderSuccess(activeHeader));
      },
      (error) => {
        dispatch(updateHeaderFailure(error));
      },
    );
  };
};

// Function 4: Get all my headers as a list
export const listMyHeaders = (page, orderField, order) => (dispatch) => {
  const success = myHeadersList => (
    dispatch({ type: LIST_MY_HEADERS_SUCCESS, myHeadersList }));

  const error = errorMessage => (
    dispatch({ type: LIST_MY_HEADERS_FAILURE, errorMessage }));

  dispatch({
    type: LIST_MY_HEADERS, page, orderField, order,
  });
  return headerService.listMyHeaders(page, orderField, order)
    .then(success)
    .catch(error);
};

// Function 5: Reset Header
export function resetNewHeader() {
  return {
    type: RESET_NEW_HEADER,
  };
}

// Function 6: Delete header
export const deleteHeader = (idHeader) => {
  function deleteSelectedHeader() { return { type: DELETE_HEADER }; }
  function deleteSelectedHeaderSuccess(idHeaderRemoved) { return { type: DELETE_HEADER_SUCCESS, idHeaderRemoved }; }
  function deleteSelectedHeaderFailure(error) { return { type: DELETE_HEADER_FAILURE, error }; }
  return (dispatch) => {
    dispatch(deleteSelectedHeader(idHeader));
    return headerService.deleteHeader(idHeader)
      .then(
        (idHeaderRemoved) => {
          dispatch(deleteSelectedHeaderSuccess(idHeaderRemoved));
        },
        (error) => {
          dispatch(deleteSelectedHeaderFailure(error));
        },
      );
  };
};
