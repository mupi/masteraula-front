import {
  LIST_FAQS,
  LIST_FAQS_SUCCESS,
  LIST_FAQS_FAILURE,
} from 'actions/faqAction';

const initialState = {
  faqList: null,
};

export const faq = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FAQS:
      return Object.assign({}, state, {
        faqList: action.faqList,
        isFetchingFaqs: true,
        error: null,
      });
    case LIST_FAQS_SUCCESS:
      return Object.assign({}, state, {
        faqList: action.faqList,
        isFetchingFaqs: false,
      });
    case LIST_FAQS_FAILURE:
      return Object.assign({}, state, {
        isFetchingFaqs: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default faq;
