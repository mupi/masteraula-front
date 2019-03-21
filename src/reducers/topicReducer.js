import {
  LIST_TOPIC,
  LIST_TOPIC_SUCCESS, LIST_TOPIC_FAILURE,
} from 'actions/topicAction';

const initialState = {
  topics: [],
};

export const topic = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TOPIC:
      return Object.assign({}, state, {
        topics: action.topics,
        isFetchingTopics: true,
        error: null,
      });
    case LIST_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        topics: action.topics,
        isFetchingTopics: false,
      });
    case LIST_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetchingTopics: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default topic;