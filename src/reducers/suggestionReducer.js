import {
  LIST_TOPIC_SUGGESTIONS,
  LIST_TOPIC_SUGGESTIONS_SUCCESS, LIST_TOPIC_SUGGESTIONS_FAILURE,
} from 'actions/suggestionAction';

const initialState = {
  topicSuggestions: [],
};

export const topic = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TOPIC_SUGGESTIONS:
      return Object.assign({}, state, {
        isFetchingTopicSuggestions: true,
        error: null,
      });
    case LIST_TOPIC_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state, {
        topicSuggestions: action.topicSuggestions,
        isFetchingTopicSuggestions: false,
      });
    case LIST_TOPIC_SUGGESTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetchingTopicSuggestions: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default topic;
