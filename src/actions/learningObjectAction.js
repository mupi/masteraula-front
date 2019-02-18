import { learningObjectService } from 'services';

// Constants for Update learningObject
export const UPDATE_LEARNING_OBJECT = 'UPDATE_LEARNING_OBJECT';
export const UPDATE_LEARNING_OBJECT_SUCCESS = 'UPDATE_LEARNING_OBJECT_SUCCESS';
export const UPDATE_LEARNING_OBJECT_FAILURE = 'UPDATE_LEARNING_OBJECT_FAILURE';

export const UPDATE_ALL_LEARNING_OBJECTS = 'UPDATE_ALL_LEARNING_OBJECTS';
export const UPDATE_ALL_LEARNING_OBJECTS_SUCCESS = 'UPDATE_ALL_LEARNING_OBJECTS_SUCCESS';
export const UPDATE_ALL_LEARNING_OBJECTS_FAILURE = 'UPDATE_ALL_LEARNING_OBJECTS_FAILURE';


// Update LearningObject
export const updateLearningObject = (props) => {
  function updateActiveLearningObject() { return { type: UPDATE_LEARNING_OBJECT }; }
  function updateLearningObjectSuccess(activeLearningObject) { return { type: UPDATE_LEARNING_OBJECT_SUCCESS, activeLearningObject }; }
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
