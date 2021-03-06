import { activityService } from 'services';
import { history } from 'helpers';
import { initialize } from 'redux-form';
import { toast } from 'react-toastify';
import { listTopicFilters } from 'actions/filterActivityAction';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

// List activities
export const LIST_ACTIVITY_PAGE = 'LIST_ACTIVITY_PAGE';
export const LIST_ACTIVITY_PAGE_SUCCESS = 'LIST_ACTIVITY_PAGE_SUCCESS';
export const LIST_ACTIVITY_PAGE_FAILURE = 'LIST_ACTIVITY_PAGE_FAILURE';

// Load single ACTIVITY
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_FAILURE = 'FETCH_ACTIVITY_FAILURE';

// Create new ACTIVITY
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAILURE = 'CREATE_ACTIVITY_FAILURE';
export const RESET_NEW_ACTIVITY = 'RESET_NEW_ACTIVITY';

// Update ACTIVITY
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export const RESET_UPDATE_ACTIVITY = 'RESET_UPDATE_ACTIVITY';

// Delete ACTIVITY
export const DELETE_ACTIVITY = 'UPDATE_ACTIVITY';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const RESET_DELETE_ACTIVITY = 'RESET_UPDATE_ACTIVITY';

export const ADD_SELECTED_OBJECT_ACTIVITY = 'ADD_SELECTED_OBJECT_ACTIVITY';
export const REMOVE_SELECTED_OBJECT_ACTIVITY = 'REMOVE_SELECTED_OBJECT_ACTIVITY';
export const RESET_SELECTED_OBJECTLIST_ACTIVITY = 'RESET_SELECTED_OBJECTLIST_ACTIVITY';

/* Activity with tasks */
export const ADD_TASK_TO_ACTIVITY = 'ADD_TASK_TO_ACTIVITY';
export const REMOVE_TASK_FROM_ACTIVITY = 'REMOVE_TASK_FROM_ACTIVITY';
export const RESET_TASKS_ACTIVITY = 'RESET_TASKS_ACTIVITY';

// Set object that will added in new Activity - Create activity based on selected object
export const SET_OBJECT_TO_NEW_ACTIVITY = 'SET_OBJECT_TO_NEW_ACTIVITY';

// List activities from modal
export const LIST_ACTIVITY_MODAL = 'LIST_ACTIVITY_MODAL';
export const LIST_ACTIVITY_MODAL_SUCCESS = 'LIST_ACTIVITY_MODAL_SUCCESS';
export const LIST_ACTIVITY_MODAL_FAILURE = 'LIST_ACTIVITY_MODAL_FAILURE';
export const SET_CURRENT_ACTIVITY_PAGE_MODAL = 'SET_CURRENT_ACTIVITY_PAGE_MODAL';
/*
{
  "learning_objects_ids": [id],
  "topics_ids":[id],
  "difficulty":"M",
  "disciplines_ids": [id],
  "teaching_levels_ids": [id],
  "tasks": [{"description_task": "string", "student_expectation": "string", "teacher_expectation":"string"}],
  "tags":["string"]
}

*/

/*
export const listActivities = (page, filter) => async (dispatch) => {
  try {
    dispatch({ type: LIST_ACTIVITY_PAGE, page });
    const activityPage = await activityService.listActivities(page, filter);

    dispatch({ type: FETCH_ACTIVITY_SUCCESS, activeActivity });
    dispatch(initialize('activitySearch', {
      searchText: filter.searchText,
      onlyMyActivities: filter.onlyMyActivities,
    }));
  } catch {
    dispatch({ type: LIST_ACTIVITY_PAGE_FAILURE });
  }
}; */


// listActivity using filters
export const listActivities = (page, filter) => {
  function requestActivityPage() { return { type: LIST_ACTIVITY_PAGE, page }; }
  function fetchActivityPageSuccess(activityPage) { return { type: LIST_ACTIVITY_PAGE_SUCCESS, activityPage }; }
  function fetchActivityPageFailure(error) { return { type: LIST_ACTIVITY_PAGE_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().activity.isFetching) {
      return 1;
    }
    dispatch(listTopicFilters(filter, { activities: true }));
    dispatch(requestActivityPage());
    return activityService.listActivities(page, filter)
      .then(
        (activityPage) => {
          dispatch(fetchActivityPageSuccess(activityPage));
          dispatch(initialize('activitySearch', {
            searchText: filter.searchText,
            onlyMyActivities: filter.onlyMyActivities,
          }));
        },
        (error) => {
          dispatch(fetchActivityPageFailure(error));
          dispatch(initialize('activitySearch', {
            searchText: filter.searchText,
          }));
          history.push('/activity-base/1');
        },
      );
  };
};


export const fetchActivity = id => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ACTIVITY });
    const activeActivity = await activityService.fetchActivity(id);

    // initialize activity Page for owner's
    dispatch(initialize('edit-activity', {
      learning_objects_ids: activeActivity.learning_objects_ids,
      topics: activeActivity.all_topics,
      difficulty: activeActivity.difficulty,
      disciplines: activeActivity.disciplines,
      teachingLevels: activeActivity.teaching_levels,
      tasks: activeActivity.tasks,
      tags: activeActivity.tags.map(tag => tag.name.trim()).join(', '),
      secret: activeActivity.secret ? 'S' : 'P',
    }));
    dispatch({ type: FETCH_ACTIVITY_SUCCESS, activeActivity });
  } catch {
    dispatch({ type: FETCH_ACTIVITY_FAILURE });
  }
};

// Create a new ACTIVITY
export const createActivity = (props) => {
  function createNewActivity() { return { type: CREATE_ACTIVITY }; }
  function createNewActivitySuccess(newActivity) { return { type: CREATE_ACTIVITY_SUCCESS, newActivity }; }
  function createNewActivityFailure(error) { return { type: CREATE_ACTIVITY_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewActivity());
    return activityService.createActivity(props).then(
      (newActivity) => {
        dispatch(createNewActivitySuccess(newActivity));
        history.push(`/view-activity/${newActivity.id}`);
        toast.success('Atividade criada com sucesso', optionsSuccess);
      },
      (error) => {
        dispatch(createNewActivityFailure(error));
      },
    );
  };
};


export const updateActivity = updatedDataActivity => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ACTIVITY });
    const updatedActivity = await activityService.updateActivity(updatedDataActivity);
    toast.success('Atividade atualizado com sucesso', optionsSuccess);
    dispatch(initialize('edit-activity', {
      learning_objects_ids: updatedActivity.learning_objects_ids,
      topics: updatedActivity.all_topics,
      difficulty: updatedActivity.difficulty,
      disciplines: updatedActivity.disciplines,
      teachingLevels: updatedActivity.teaching_levels,
      tasks: updatedActivity.tasks,
      tags: updatedActivity.tags.map(tag => tag.name.trim()).join(', '),
      secret: updatedActivity.secret ? 'S' : 'P',
    }));
    dispatch({ type: UPDATE_ACTIVITY_SUCCESS, activeActivity: updatedActivity });
  } catch {
    dispatch({ type: UPDATE_ACTIVITY_FAILURE });
  }
};

/* Functions for Class Plan Station */
export const addTaskToActivity = task => ({
  type: ADD_TASK_TO_ACTIVITY,
  task,
});

export const removeTaskFromActivity = removedIndex => ({
  type: REMOVE_TASK_FROM_ACTIVITY,
  removedIndex,
});

export const resetTasksFromActivity = () => ({
  type: RESET_TASKS_ACTIVITY,
});

// Add Selected Object to Activity
export const addSelectedObjectToActivity = selectedObject => ({
  type: ADD_SELECTED_OBJECT_ACTIVITY, selectedObject,
});

// Remove Selected Object from Activity
export const removeSelectedObjectFromActivity = idObject => ({
  type: REMOVE_SELECTED_OBJECT_ACTIVITY, idObject,
});

// Reset Selected Object list before starting create/update activity
export const resetSelectedObjects = () => ({
  type: RESET_SELECTED_OBJECTLIST_ACTIVITY,
});

export const deleteActivity = idActivity => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACTIVITY });
    const idActivityRemoved = await activityService.deleteActivity(idActivity);
    dispatch({ type: DELETE_ACTIVITY_SUCCESS, idActivityRemoved });
    history.push('/activity-base/1');
  } catch {
    dispatch({ type: DELETE_ACTIVITY_FAILURE });
  }
};


// Functions for create activity based on Object
export const setObjectIdToNewActivity = objectId => ({
  type: SET_OBJECT_TO_NEW_ACTIVITY,
  objectIdAddedToActivity: objectId,
});


// List activity - Modal
export const listActivitiesModal = (currentPageModal, filterActivity) => {
  function requestActivityModal() { return { type: LIST_ACTIVITY_MODAL, currentPageModal }; }
  function requestActivityModalSuccess(activityPageModal) { return { type: LIST_ACTIVITY_MODAL_SUCCESS, activityPageModal }; }
  function requestActivityModalFailure(error) { return { type: LIST_ACTIVITY_MODAL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestActivityModal());
    return activityService.listActivityModal(currentPageModal, filterActivity).then(
      (activityPageModal) => {
        dispatch(requestActivityModalSuccess(activityPageModal));
        dispatch(initialize('activitySearchModal', {
          searchText: filterActivity && filterActivity.searchTextModal ? filterActivity.searchTextModal : '',
        }));
      }, (error) => {
        dispatch(requestActivityModalFailure(error));
      },
    );
  };
};

// Set page for search activities in modal
export const setCurrentPageModal = currentPageModal => ({
  type: SET_CURRENT_ACTIVITY_PAGE_MODAL, currentPageModal,
});
