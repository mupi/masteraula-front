import {
  FETCH_CLASS_PLAN,
  FETCH_CLASS_PLAN_SUCCESS,
  FETCH_CLASS_PLAN_FAILURE,

  LIST_CLASS_PLANS,
  LIST_CLASS_PLANS_SUCCESS,
  LIST_CLASS_PLANS_FAILURE,

  CREATE_CLASS_PLAN,
  CREATE_CLASS_PLAN_SUCCESS,
  CREATE_CLASS_PLAN_FAILURE,

  UPDATE_CLASS_PLAN,
  UPDATE_CLASS_PLAN_SUCCESS,
  UPDATE_CLASS_PLAN_FAILURE,

  DELETE_CLASS_PLAN,
  DELETE_CLASS_PLAN_SUCCESS,
  DELETE_CLASS_PLAN_FAILURE,

} from 'actions/classPlanAction';
import { toast } from 'react-toastify';

const initialState = {
  classPlans: [],
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const classPlan = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASS_PLAN:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_CLASS_PLAN_SUCCESS:
      return Object.assign({}, state, {
        activeClassPlan: action.activeClassPlan,
        selectedObjectList: action.activeClassPlan.learning_objects,
        selectedDocumentList: action.activeClassPlan.documents,
        isFetching: false,
      });
    case FETCH_CLASS_PLAN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case CREATE_CLASS_PLAN:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isCreated: false,
      });
    case CREATE_CLASS_PLAN_SUCCESS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        classPlans: [...state.classPlans, action.newClassPlan],
        isCreated: true,
      });
    case CREATE_CLASS_PLAN_FAILURE:
      return Object.assign({}, state, {
        isCreated: false,
        error: action.error,
      });
    case UPDATE_CLASS_PLAN: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_CLASS_PLAN_SUCCESS: {
      const newClassPlans = state.classPlans.filter(item => item.id !== action.activeClassPlan.id);
      return Object.assign({}, state, {
        classPlans: [...newClassPlans, action.activeClassPlan],
        isUpdated: true,
      });
    }
    case UPDATE_CLASS_PLAN_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case DELETE_CLASS_PLAN: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_CLASS_PLAN_SUCCESS: {
      toast.success('Etiqueta removida com sucesso', optionsSuccess);
      const newClassPlans = state.classPlans.filter(item => item.id !== action.idClassPlanRemoved);

      return Object.assign({}, state, {
        classPlans: newClassPlans,
        isDeleted: true,
      });
    }
    case DELETE_CLASS_PLAN_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    case LIST_CLASS_PLANS:
      return Object.assign({}, state, {
        classPlans: action.classPlans,
        isFetchingClassPlans: true,
        error: null,
      });
    case LIST_CLASS_PLANS_SUCCESS:
      return Object.assign({}, state, {
        classPlans: action.classPlans,
        isFetchingClassPlans: false,
      });
    case LIST_CLASS_PLANS_FAILURE:
      return Object.assign({}, state, {
        isFetchingClassPlans: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default classPlan;
