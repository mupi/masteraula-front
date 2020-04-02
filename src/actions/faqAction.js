import { faqService } from 'services';

// Load
export const LIST_FAQS = 'LIST_FAQS';
export const LIST_FAQS_SUCCESS = 'LIST_FAQS_SUCCESS';
export const LIST_FAQS_FAILURE = 'LIST_FAQS_FAILURE';

// List all my question labels
export const listFaqs = (param) => {
  function requestlistFaqs() { return { type: LIST_FAQS }; }
  function fetchFaqsSuccess(faqList) {
    return { type: LIST_FAQS_SUCCESS, faqList };
  }
  function fetchFaqsFailure(error) {
    return { type: LIST_FAQS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestlistFaqs(param));
    return faqService.listFaqs(param)
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
