import { topicService } from 'services';

// Load
export const LIST_TOPIC = 'LIST_TOPIC';
export const LIST_TOPIC_SUCCESS = 'LIST_TOPIC_SUCCESS';
export const LIST_TOPIC_FAILURE = 'LIST_TOPIC_FAILURE';


// List all topics
export const listTopics = (param) => {
  function requestListTopics() { return { type: LIST_TOPIC }; }
  function fetchListTopicsSuccess(topics) {
    return { type: LIST_TOPIC_SUCCESS, topics };
  }
  function fetchListTopicsFailure(error) {
    return { type: LIST_TOPIC_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListTopics(param));
    return topicService.listTopics(param)
      .then(
        (topics) => {
          dispatch(fetchListTopicsSuccess(topics));
        },
        (error) => {
          dispatch(fetchListTopicsFailure(error));
        },
      );
  };
};