import { learningObjectService } from 'services';
import { history } from 'helpers/history';
import { initialize } from 'redux-form';

// Load single learning object
export const FETCH_LEARNING_OBJECT = 'FETCH_LEARNING_OBJECT';
export const FETCH_LEARNING_OBJECT_SUCCESS = 'FETCH_LEARNING_OBJECT_SUCCESS';
export const FETCH_LEARNING_OBJECT_FAILURE = 'FETCH_LEARNING_OBJECT_FAILURE';

// Load all learning object
export const LIST_LEARNING_OBJECT = 'LIST_LEARNING_OBJECT';
export const LIST_LEARNING_OBJECT_SUCCESS = 'LIST_LEARNING_OBJECT_SUCCESS';
export const LIST_LEARNING_OBJECT_FAILURE = 'LIST_LEARNING_OBJECT_FAILURE';

// Constants for Update learningObject
export const UPDATE_LEARNING_OBJECT = 'UPDATE_LEARNING_OBJECT';
export const UPDATE_LEARNING_OBJECT_SUCCESS = 'UPDATE_LEARNING_OBJECT_SUCCESS';
export const UPDATE_LEARNING_OBJECT_FAILURE = 'UPDATE_LEARNING_OBJECT_FAILURE';

export const UPDATE_ALL_LEARNING_OBJECTS = 'UPDATE_ALL_LEARNING_OBJECTS';
export const UPDATE_ALL_LEARNING_OBJECTS_SUCCESS = 'UPDATE_ALL_LEARNING_OBJECTS_SUCCESS';
export const UPDATE_ALL_LEARNING_OBJECTS_FAILURE = 'UPDATE_ALL_LEARNING_OBJECTS_FAILURE';

// List learning object from modal
export const LIST_LEARNING_OBJECT_MODAL = 'LIST_LEARNING_OBJECT_MODAL';
export const LIST_LEARNING_OBJECT_MODAL_SUCCESS = 'LIST_LEARNING_OBJECT_MODAL_SUCESS';
export const LIST_LEARNING_OBJECT_MODAL_FAILURE = 'LIST_LEARNING_OBJECT_MODAL_FAILURE';
export const SET_CURRENT_PAGE_MODAL = 'SET_CURRENT_PAGE_MODAL';

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
        history.push('/object-base/1');
      },
    );
  };
};

// Update LearningObject
export const updateLearningObject = (props, showMessage = true) => {
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

// List learning objects
export const listLearningObject = (page, filterObject) => {
  function requestLearningObject() { return { type: LIST_LEARNING_OBJECT, page }; }
  function requestLearningObjectSuccess(objectPage) { return { type: LIST_LEARNING_OBJECT_SUCCESS, objectPage }; }
  function requestLearningObjectFailure(error) { return { type: LIST_LEARNING_OBJECT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestLearningObject());
    return learningObjectService.listLearningObject(page, filterObject).then(
      (objectPage) => {
        dispatch(requestLearningObjectSuccess(objectPage));
        dispatch(initialize('learningObjectSearch', {
          searchTextObject: filterObject.searchTextObject,
        }));
      }, (error) => {
        dispatch(requestLearningObjectFailure(error));
        dispatch(initialize('learningObjectSearch', {
          searchTextObject: filterObject.searchTextObject,
        }));
      },
    );
  };
};

// List learning objects - Modal
export const listLearningObjectModal = (currentPageModal, filterObject) => {
  function requestLearningObjectModal() { return { type: LIST_LEARNING_OBJECT_MODAL, currentPageModal }; }
  function requestLearningObjectModalSuccess(objectPageModal) { return { type: LIST_LEARNING_OBJECT_MODAL_SUCCESS, objectPageModal }; }
  function requestLearningObjectModalFailure(error) { return { type: LIST_LEARNING_OBJECT_MODAL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestLearningObjectModal());
    return learningObjectService.listLearningObjectModal(currentPageModal, filterObject).then(
      (objectPageModal) => {
        dispatch(requestLearningObjectModalSuccess(objectPageModal));
        dispatch(initialize('learningObjectSearchModal', {
          searchTextObject: filterObject.searchTextObjectModal,
        }));
      }, (error) => {
        dispatch(requestLearningObjectModalFailure(error));
        dispatch(initialize('learningObjectSearchModal', {
          searchTextObject: filterObject.searchTextObjectModal,
        }));
      },
    );
  };
};

// Set page for search objects in modal
export const setCurrentPageModal = currentPageModal => ({
  type: SET_CURRENT_PAGE_MODAL, currentPageModal,
});
