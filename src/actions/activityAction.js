import { activityService } from 'services';
import { history } from 'helpers';
import { initialize } from 'redux-form';
import { toast } from 'react-toastify';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

// List activities
export const LIST_ACTIVITIES_PAGE = 'LIST_ACTIVITIES_PAGE';
export const LIST_ACTIVITIES_PAGE_SUCCESS = 'LIST_ACTIVITIES_PAGE_SUCCESS';
export const LIST_ACTIVITIES_PAGE_FAILURE = 'LIST_ACTIVITIES_PAGE_FAILURE';

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
export const fetchActivity = id => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ACTIVITY });
    const activeActivity = await activityService.fetchActivity(id);
    dispatch({ type: FETCH_ACTIVITY_SUCCESS, activeActivity });

    // initialize activity Page for owner's
    dispatch(initialize('edit-activity', {
    }));
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
    dispatch({ type: DELETE_ACTIVITY_SUCCESS });
  }
};
