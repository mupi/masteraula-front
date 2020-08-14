import {
  LIST_TERMS_USE,
  LIST_TERMS_USE_SUCCESS,
  LIST_TERMS_USE_FAILURE,
} from 'actions/termsUseAction';

const initialState = {
  termsUseList: null,
};

export const termsUse = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TERMS_USE:
      return Object.assign({}, state, {
        termsUseList: action.termsUseList,
        isFetching: true,
        error: null,
      });
    case LIST_TERMS_USE_SUCCESS:
      return Object.assign({}, state, {
        termsUseList: action.termsUseList,
        isFetching: false,
      });
    case LIST_TERMS_USE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default termsUse;
