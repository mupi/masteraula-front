import { learningObjectService } from 'services';
import { history } from 'helpers/history';

// Constants for Update learningObject

// Load single learning object
export const FETCH_LEARNING_OBJECT = 'FETCH_LEARNING_OBJECT';
export const FETCH_LEARNING_OBJECT_SUCCESS = 'FETCH_LEARNING_OBJECT_SUCCESS';
export const FETCH_LEARNING_OBJECT_FAILURE = 'FETCH_LEARNING_OBJECT_FAILURE';


export const UPDATE_LEARNING_OBJECT = 'UPDATE_LEARNING_OBJECT';
export const UPDATE_LEARNING_OBJECT_SUCCESS = 'UPDATE_LEARNING_OBJECT_SUCCESS';
export const UPDATE_LEARNING_OBJECT_FAILURE = 'UPDATE_LEARNING_OBJECT_FAILURE';

export const UPDATE_ALL_LEARNING_OBJECTS = 'UPDATE_ALL_LEARNING_OBJECTS';
export const UPDATE_ALL_LEARNING_OBJECTS_SUCCESS = 'UPDATE_ALL_LEARNING_OBJECTS_SUCCESS';
export const UPDATE_ALL_LEARNING_OBJECTS_FAILURE = 'UPDATE_ALL_LEARNING_OBJECTS_FAILURE';

// Fetch a learning object
export const fetchLearningObject = (id) => {
  function requestLearningObject() { return { type: FETCH_LEARNING_OBJECT }; }
  function requestLearningObjectSuccess(activeLearningObject) { return { type: FETCH_LEARNING_OBJECT_SUCCESS, activeLearningObject }; }
  function requestLearningObjectFailure(error) { return { type: FETCH_LEARNING_OBJECT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestLearningObject(id));
    return learningObjectService.fetchLearningObject(id).then(
      (activeLearningObject) => {
        dispatch(requestLearningObjectSuccess(activeLearningObject));
      }, (error) => {
        dispatch(requestLearningObjectFailure(error));
        history.push('/question-base/1');
      },
    );
  };
}; 

// Update LearningObject
export const updateLearningObject = (props, showMessage =true) => {
  function updateActiveLearningObject() { return { type: UPDATE_LEARNING_OBJECT }; }
  function updateLearningObjectSuccess(activeLearningObject) { return { type: UPDATE_LEARNING_OBJECT_SUCCESS, activeLearningObject, showMessage }; }
  function updateLearningObjectFailure(error) { return { type: UPDATE_LEARNING_OBJECT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveLearningObject(props));
    return learningObjectService.updateLearningObject(props).then(
      (activeLearningObject) => {
        dispatch(updateLearningObjectSuccess(activeLearningObject));
      }, 
      (error) => {
        dispatch(updateLearningObjectFailure(error));
      },
    );
  };
};
