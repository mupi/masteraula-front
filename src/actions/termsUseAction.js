import { termsUseService } from 'services';

// Load
export const LIST_TERMS_USE = 'LIST_TERMS_USE';
export const LIST_TERMS_USE_SUCCESS = 'LIST_TERMS_USE_SUCCESS';
export const LIST_TERMS_USE_FAILURE = 'LIST_TERMS_USE_FAILURE';

// List all termsUse - with async/await
export const listTermsUse = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_TERMS_USE });
    const response = await termsUseService.listTermsUse();
    dispatch({ type: LIST_TERMS_USE_SUCCESS, termsUseList: response });
  } catch {
    dispatch({ type: LIST_TERMS_USE_FAILURE });
  }
};
