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
    case LIST_TOPIC_SUGGESTIONS_SUCCESS: {
      const synonymsTopics = action.topicSuggestions.synonyms.map(synonym => synonym.topics.map(t => ({
        ...t,
        name: `${synonym.term} -> ${t.name}`,
      }))).flat();
      const topicSuggestionNew = synonymsTopics.length > 0
        ? [...action.topicSuggestions.topics, ...synonymsTopics] : [...action.topicSuggestions.topics];

      const topicSuggestionUnique = [...new Set(topicSuggestionNew.map(t => ({
        name: t.name.trim(),
      })))];

      /* console.log("hola");
        console.log(topicSuggestionUnique);
      */

      return Object.assign({}, state, {
        topicSuggestions: topicSuggestionUnique,
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
