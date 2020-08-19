import { suggestionService } from 'services';

// List topic suggestions
export const LIST_TOPIC_SUGGESTIONS = 'LIST_TOPIC_SUGGESTIONS';
export const LIST_TOPIC_SUGGESTIONS_SUCCESS = 'LIST_TOPIC_SUGGESTIONS_SUCCESS';
export const LIST_TOPIC_SUGGESTIONS_FAILURE = 'LIST_TOPIC_SUGGESTIONS_FAILURE';

// List bncc suggestions
export const LIST_BNCC_SUGGESTIONS = 'LIST_BNCC_SUGGESTIONS';
export const LIST_BNCC_SUGGESTIONS_SUCCESS = 'LIST_BNCC_SUGGESTIONS_SUCCESS';
export const LIST_BNCC_SUGGESTIONS_FAILURE = 'LIST_BNCC_SUGGESTIONS_FAILURE';

// List all topics test
export const listTopicSuggestions = (param) => {
  function requestListTopicSuggestions() { return { type: LIST_TOPIC_SUGGESTIONS }; }
  function fetchListTopicSuggestionsSuccess(topicSuggestions) {
    return { type: LIST_TOPIC_SUGGESTIONS_SUCCESS, topicSuggestions };
  }
  function fetchListSuggestionsFailure(error) {
    return { type: LIST_TOPIC_SUGGESTIONS_FAILURE, error };
  }
  return (dispatch, getState) => {
    dispatch(requestListTopicSuggestions(param, getState().filter));
    return suggestionService.listTopicSuggestions(param, getState().filter)
      .then(
        (topicSuggestions) => {
          dispatch(fetchListTopicSuggestionsSuccess(topicSuggestions));
        },
        (error) => {
          dispatch(fetchListSuggestionsFailure(error));
        },
      );
  };
};

// List all bncc codes
export const listBnccSuggestions = (param) => {
  function requestListBnccSuggestions() { return { type: LIST_BNCC_SUGGESTIONS }; }
  function fetchListBnccSuggestionsSuccess(bnccSuggestions) {
    return { type: LIST_BNCC_SUGGESTIONS_SUCCESS, bnccSuggestions };
  }
  function fetchListBnccSuggestionsFailure(error) {
    return { type: LIST_BNCC_SUGGESTIONS_FAILURE, error };
  }
  return (dispatch, getState) => {
    dispatch(requestListBnccSuggestions(param, getState().filter));
    return suggestionService.listBnccSuggestions(param, getState().filter)
      .then(
        (bnccSuggestions) => {
          dispatch(fetchListBnccSuggestionsSuccess(bnccSuggestions));
        },
        (error) => {
          dispatch(fetchListBnccSuggestionsFailure(error));
        },
      );
  };
};
