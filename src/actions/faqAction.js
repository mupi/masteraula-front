import { faqService } from 'services';

// Load
export const LIST_FAQS = 'LIST_FAQS';
export const LIST_FAQS_SUCCESS = 'LIST_FAQS_SUCCESS';
export const LIST_FAQS_FAILURE = 'LIST_FAQS_FAILURE';

// List all faqs - with promise
/* export const listFaqs = () => {
  function requestlistFaqs() { return { type: LIST_FAQS }; }
  function fetchFaqsSuccess(faqList) {
    return { type: LIST_FAQS_SUCCESS, faqList };
  }
  function fetchFaqsFailure(error) {
    return { type: LIST_FAQS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestlistFaqs());
    return faqService.listFaqs()
      .then(
        (faqList) => {
          dispatch(fetchFaqsSuccess(faqList));
        },
        (error) => {
          dispatch(fetchFaqsFailure(error));
        },
      );
  };
};
*/

// List all faqs - with async/await

export const listFaqs = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_FAQS });
    const response = await faqService.listFaqs();
    dispatch({ type: LIST_FAQS_SUCCESS, faqList: response });
  } catch {
    dispatch({ type: LIST_FAQS_FAILURE });
  }
};
