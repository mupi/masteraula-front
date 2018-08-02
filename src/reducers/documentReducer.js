import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
} from 'actions/documentAction';

const initialState = {
  activeDocument: {},
};

export const document = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
        isFetching: false,
      });
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default document;
