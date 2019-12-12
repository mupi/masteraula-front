import {
  LIST_TOPIC_SUGGESTIONS,
  LIST_TOPIC_SUGGESTIONS_SUCCESS, LIST_TOPIC_SUGGESTIONS_FAILURE,
} from 'actions/suggestionAction';

const initialState = {
  topicSuggestions: [],
  error: null,
  isFetchingTopicSuggestions: false,
};

export const topic = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TOPIC_SUGGESTIONS:
      return Object.assign({}, state, {
        topicSuggestions: [],
        isFetchingTopicSuggestions: true,
        error: null,
      });
    case LIST_TOPIC_SUGGESTIONS_SUCCESS: {
      const synonymsTopics = action.topicSuggestions.synonyms.map(synonym => synonym.topics.map(t => ({
        ...t,
        name: `${synonym.term} -> ${t.name}`,
      }))).flat();
      const topicSuggestionNew = synonymsTopics.length > 0
        ? [...action.topicSuggestions.topics, ...synonymsTopics] : [...action.topicSuggestions.topics];

      const topicSuggestionUniquex = Array.from(new Set(topicSuggestionNew.map(a => a.name.trim())))
        .map(name => topicSuggestionNew.find(a => a.name.trim() === name.trim()));

      return Object.assign({}, state, {
        topicSuggestions: topicSuggestionUniquex,
        isFetchingTopicSuggestions: false,
      });
    }
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
