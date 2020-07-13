import { learningObjectService } from 'services';
import { history } from 'helpers';
import { initialize } from 'redux-form';
import { toast } from 'react-toastify';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

/* learning object's structure

owner: 26
source: teste fonte
image: (binary)
folder_name:
text: teste text
object_types: T,I
tags: testetag

*/
// Load single learning object
export const FETCH_LEARNING_OBJECT = 'FETCH_LEARNING_OBJECT';
export const FETCH_LEARNING_OBJECT_SUCCESS = 'FETCH_LEARNING_OBJECT_SUCCESS';
export const FETCH_LEARNING_OBJECT_FAILURE = 'FETCH_LEARNING_OBJECT_FAILURE';

// Load all learning object
export const LIST_LEARNING_OBJECT = 'LIST_LEARNING_OBJECT';
export const LIST_LEARNING_OBJECT_SUCCESS = 'LIST_LEARNING_OBJECT_SUCCESS';
export const LIST_LEARNING_OBJECT_FAILURE = 'LIST_LEARNING_OBJECT_FAILURE';

// Constants for creating learning object
export const CREATE_LEARNING_OBJECT = 'CREATE_LEARNING_OBJECT';
export const CREATE_LEARNING_OBJECT_SUCCESS = 'CREATE_LEARNING_OBJECT_SUCCESS';
export const CREATE_LEARNING_OBJECT_FAILURE = 'CREATE_LEARNING_OBJECT_FAILURE';

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

export const ADD_SELECTED_LABEL_LEARNING_OBJECT = 'ADD_SELECTED_LABEL_LEARNING_OBJECT';
export const REMOVE_SELECTED_LABEL_LEARNING_OBJECT = 'REMOVE_SELECTED_LABEL_LEARNING_OBJECT';
export const REMOVE_SELECTED_LABEL_LEARNING_OBJECT_AFTER_DELETING_LABEL = 'REMOVE_SELECTED_LABEL_LEARNING_OBJECT_AFTER_DELETING_LABEL';

// Delete object
export const DELETE_LEARNING_OBJECT = 'DELETE_LEARNING_OBJECT';
export const DELETE_LEARNING_OBJECT_SUCCESS = 'DELETE_LEARNING_OBJECT_SUCCESS';
export const DELETE_LEARNING_OBJECT_FAILURE = 'DELETE_LEARNING_OBJECT_FAILURE';

// Fetch a learning object
export const fetchLearningObject = (id) => {
  function requestLearningObject() { return { type: FETCH_LEARNING_OBJECT }; }
  function requestLearningObjectSuccess(activeLearningObject) { return { type: FETCH_LEARNING_OBJECT_SUCCESS, activeLearningObject }; }
  function requestLearningObjectFailure(error) { return { type: FETCH_LEARNING_OBJECT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestLearningObject(id));
    return learningObjectService.fetchLearningObject(id).then(
      (activeLearningObject) => {
        // initialize object Page for owner's
        dispatch(initialize('edit-object', {
          owner: activeLearningObject.owner,
          source: activeLearningObject.source,
          image: activeLearningObject.image,
          text: activeLearningObject.text,
          tags: activeLearningObject.tags.map(tag => tag.name.trim()).join(', '),
        }));
        dispatch(requestLearningObjectSuccess(activeLearningObject));
      }, (error) => {
        dispatch(requestLearningObjectFailure(error));
        history.push('/object-base/1');
      },
    );
  };
};

// Create a new learning object
export const createLearningObject = newDataObject => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LEARNING_OBJECT });
    const newObject = await learningObjectService.createLearningObject(newDataObject);
    dispatch({ type: CREATE_LEARNING_OBJECT_SUCCESS, newObject });
    history.push(`/view-object/${newObject.id}`);
    toast.success('Objeto criado com sucesso', optionsSuccess);
  } catch {
    dispatch({ type: CREATE_LEARNING_OBJECT_FAILURE });
  }
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
        history.push('/object-base/1');
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
          searchTextObject: filterObject && filterObject.searchTextObjectModal ? filterObject.searchTextObjectModal : '',
        }));
      }, (error) => {
        dispatch(requestLearningObjectModalFailure(error));
        dispatch(initialize('learningObjectSearchModal', {
          searchTextObject: filterObject && filterObject.searchTextObjectModal ? filterObject.searchTextObjectModal : '',
        }));
      },
    );
  };
};

// Set page for search objects in modal
export const setCurrentPageModal = currentPageModal => ({
  type: SET_CURRENT_PAGE_MODAL, currentPageModal,
});

// Add Selected Label to Question
export const addSelectedLabelToLearningObject = (idQuestion, label) => ({
  type: ADD_SELECTED_LABEL_LEARNING_OBJECT, idQuestion, label,
});

// Remove Selected Label to Question
export const removeSelectedLabelFromLearningObject = (idQuestion, idLabel) => ({
  type: REMOVE_SELECTED_LABEL_LEARNING_OBJECT, idQuestion, idLabel,
});

// Remove Selected Label to Question after deleting label
export const removeSelectedLabelFromLearningObjectAfterDeletingLabel = idLabel => ({
  type: REMOVE_SELECTED_LABEL_LEARNING_OBJECT_AFTER_DELETING_LABEL, idLabel,
});

export const deleteLearningObject = id => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LEARNING_OBJECT });
    const idObjectRemoved = await learningObjectService.deleteLearningObject(id);
    dispatch({ type: DELETE_LEARNING_OBJECT_SUCCESS, idObjectRemoved });
    history.push('/object-base/1');
  } catch {
    dispatch({ type: DELETE_LEARNING_OBJECT_FAILURE });
  }
};
