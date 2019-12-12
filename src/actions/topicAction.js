import { topicService } from 'services';
import { history } from 'helpers';

// Load
export const LIST_TOPIC = 'LIST_TOPIC';
export const LIST_TOPIC_SUCCESS = 'LIST_TOPIC_SUCCESS';
export const LIST_TOPIC_FAILURE = 'LIST_TOPIC_FAILURE';
export const RESET_TOPIC_LIST = 'RESET_TOPIC_LIST';

// Add selected discipline filter
export const ADD_SELECTED_DISCIPLINE_FILTER = 'ADD_SELECTED_DISCIPLINE_FILTER';

/* List all topics - OLD
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
*/

// List all topics by filters
export const listTopics = (disciplineIdSelected, page, orderField, order) => {
  function requestListTopics() {
    return {
      type: LIST_TOPIC, page, orderField, order, disciplineIdSelected,
    };
  }
  function fetchListTopicsSuccess(topics) { return { type: LIST_TOPIC_SUCCESS, topics }; }
  function fetchListTopicsFailure(errorMessage) { return { type: LIST_TOPIC_FAILURE, errorMessage }; }
  return (dispatch) => {
    dispatch(requestListTopics());
    return topicService.listTopics(disciplineIdSelected, page, orderField, order)
      .then(
        (topics) => {
          dispatch(fetchListTopicsSuccess(topics));
        },
        (error) => {
          dispatch(fetchListTopicsFailure(error));
          history.push('/topic-base/1');
        },
      );
  };
};

// Add Selected Discipline filter
export const addSelectedDisciplineFilter = idDiscipline => ({
  type: ADD_SELECTED_DISCIPLINE_FILTER, idDiscipline,
});

// Reset topic list
export const resetTopicList = () => ({
  type: RESET_TOPIC_LIST,
});
