import { learningObjectService } from 'services';

// Constants for Update learningObject
export const UPDATE_LEARNING_OBJECT = 'UPDATE_LEARNING_OBJECT';
export const UPDATE_LEARNING_OBJECT_SUCCESS = 'UPDATE_LEARNING_OBJECT_SUCCESS';
export const UPDATE_LEARNING_OBJECT_FAILURE = 'UPDATE_LEARNING_OBJECT_FAILURE';


// Update LearningObject
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