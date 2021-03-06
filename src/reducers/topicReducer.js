import {
  LIST_TOPIC,
  LIST_TOPIC_SUCCESS, LIST_TOPIC_FAILURE,
  RESET_TOPIC_LIST,
} from 'actions/topicAction';

const initialState = {
  topics: [],
};

export const topic = (state = initialState, action) => {
  switch (action.type) {
    case LIST_TOPIC:
      return Object.assign({}, state, {
        isFetchingTopics: true,
        error: null,
        topics: action.topics,
        disciplineIdSelected: action.disciplineIdSelected,
        currentPage: action.page,
        orderField: action.orderField,
        order: action.order,
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
    case RESET_TOPIC_LIST:
      return Object.assign({}, state, {
        topics: null,
        isFetchingTopics: false,
      });
    default:
      return state;
  }
};

export default topic;
