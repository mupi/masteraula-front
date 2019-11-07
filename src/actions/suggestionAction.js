import { suggestionService } from 'services';

// List topic suggestions
export const LIST_TOPIC_SUGGESTIONS = 'LIST_TOPIC_SUGGESTIONS';
export const LIST_TOPIC_SUGGESTIONS_SUCCESS = 'LIST_TOPIC_SUGGESTIONS_SUCCESS';
export const LIST_TOPIC_SUGGESTIONS_FAILURE = 'LIST_TOPIC_SUGGESTIONS_FAILURE';

// List all topics test
export const listTopicSuggestions = (param) => {
  function requestListTopicSuggestions() { return { type: LIST_TOPIC_SUGGESTIONS }; }
  function fetchListTopicSuggestionsSuccess(topicSuggestions) {
    return { type: LIST_TOPIC_SUGGESTIONS_SUCCESS, topicSuggestions };
  }
  function fetchListSuggestionsFailure(error) {
    return { type: LIST_TOPIC_SUGGESTIONS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListTopicSuggestions(param));
    return suggestionService.listTopicSuggestions(param)
      .then(
        (topicSuggestions) => {
          dispatch(fetchListTopicSuggestionsSuccess(topicSuggestions.results));
        },
        (error) => {
          dispatch(fetchListSuggestionsFailure(error));
        },
      );
  };
};
