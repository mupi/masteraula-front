import {
  FETCH_ACTIVITY,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,

  LIST_ACTIVITY_PAGE,
  LIST_ACTIVITY_PAGE_SUCCESS,
  LIST_ACTIVITY_PAGE_FAILURE,

  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,

  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAILURE,

  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAILURE,

  ADD_SELECTED_OBJECT_ACTIVITY,
  REMOVE_SELECTED_OBJECT_ACTIVITY,
  RESET_SELECTED_OBJECTLIST_ACTIVITY,

  /* Activity's tasks */
  ADD_TASK_TO_ACTIVITY,
  REMOVE_TASK_FROM_ACTIVITY,
  RESET_TASKS_ACTIVITY,

  SET_OBJECT_TO_NEW_ACTIVITY,


} from 'actions/activityAction';
import { toast } from 'react-toastify';

const initialState = {
  selectedObjectList: [],
  activityPage: {},
  tasks: [
    {},
  ],
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const activity = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        activeActivity: action.activeActivity,
        selectedObjectList: [],
        isFetching: false,
      });
    case FETCH_ACTIVITY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        selectedObjectList: [],
        error: action.error,
      });
    case LIST_ACTIVITY_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page,
        isFetching: true,
        error: null,
      });
    case LIST_ACTIVITY_PAGE_SUCCESS:
      return Object.assign({}, state, {
        activityPage: action.activityPage,
        isFetching: false,
      });
    case LIST_ACTIVITY_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case CREATE_ACTIVITY:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isCreated: false,
      });
    case CREATE_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isCreated: true,
      });
    case CREATE_ACTIVITY_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isCreated: false,
        error: action.error,
      });
    }
    /* INI: Activity with tasks */
    case ADD_TASK_TO_ACTIVITY: {
      return Object.assign({}, state, {
        tasks: [...state.tasks, action.task],
      });
    }
    case REMOVE_TASK_FROM_ACTIVITY: {
      const newTasks = [...state.tasks.filter((x, index) => index !== action.removedIndex)];
      return Object.assign({}, state, {
        tasks: newTasks,
      });
    }
    case RESET_TASKS_ACTIVITY: {
      return Object.assign({}, state, {
        tasks: [
          {}, {},
        ],
      });
    }
    case UPDATE_ACTIVITY: {
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
      });
    }
    case UPDATE_ACTIVITY_SUCCESS: {
      return Object.assign({}, state, {
        activeActivity: { ...action.activeActivity },
        isUpdated: true,
      });
    }
    case UPDATE_ACTIVITY_FAILURE: {
      toast.error(action.error, optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    case DELETE_ACTIVITY: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_ACTIVITY_SUCCESS: {
      toast.success('Atividade removida com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isDeleted: true,
      });
    }
    case DELETE_ACTIVITY_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    case ADD_SELECTED_OBJECT_ACTIVITY: {
      if (state.selectedObjectList.filter(item => item.id === action.selectedObject.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedObjectList: [...state.selectedObjectList, action.selectedObject],
      });
    }
    case REMOVE_SELECTED_OBJECT_ACTIVITY: {
      const newSelectedObjectList = state.selectedObjectList.filter(item => item.id !== action.idObject);
      return Object.assign({}, state, {
        selectedObjectList: newSelectedObjectList,
      });
    }
    case RESET_SELECTED_OBJECTLIST_ACTIVITY: {
      const newSelectedObjectList = state.selectedObjectList.filter(item => item.id === state.objectIdAddedToActivity);
      return Object.assign({}, state, {
        selectedObjectList: newSelectedObjectList,
        objectIdAddedToQuestion: undefined,
      });
    }
    case SET_OBJECT_TO_NEW_ACTIVITY: {
      return Object.assign({}, state, {
        objectIdAddedToActivity: action.objectIdAddedToActivity,
      });
    }
    default:
      return state;
  }
};

export default activity;
