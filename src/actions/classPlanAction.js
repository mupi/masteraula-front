import {
  classPlanService,
} from 'services';
import { toast } from 'react-toastify';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};
// Load

export const FETCH_CLASS_PLAN = 'FETCH_CLASS_PLAN';
export const FETCH_CLASS_PLAN_SUCCESS = 'FETCH_CLASS_PLAN_SUCCESS';
export const FETCH_CLASS_PLAN_FAILURE = 'FETCH_CLASS_PLAN_FAILURE';

export const LIST_CLASS_PLANS = 'LIST_CLASS_PLANS';
export const LIST_CLASS_PLANS_SUCCESS = 'LIST_CLASS_PLANS_SUCCESS';
export const LIST_CLASS_PLANS_FAILURE = 'LIST_CLASS_PLANS_FAILURE';

export const CREATE_CLASS_PLAN = 'CREATE_CLASS_PLAN';
export const CREATE_CLASS_PLAN_SUCCESS = 'CREATE_CLASS_PLAN_SUCCESS';
export const CREATE_CLASS_PLAN_FAILURE = 'CREATE_CLASS_PLAN_FAILURE';

export const UPDATE_CLASS_PLAN = 'UPDATE_CLASS_PLAN';
export const UPDATE_CLASS_PLAN_SUCCESS = 'UPDATE_CLASS_PLAN_SUCCESS';
export const UPDATE_CLASS_PLAN_FAILURE = 'UPDATE_CLASS_PLAN_FAILURE';

export const DELETE_CLASS_PLAN = 'DELETE_CLASS_PLAN';
export const DELETE_CLASS_PLAN_SUCCESS = 'DELETE_CLASS_PLAN_SUCCESS';
export const DELETE_CLASS_PLAN_FAILURE = 'DELETE_CLASS_PLAN_FAILURE';


export const fetchClassPlan = (id) => {
  function requestClassPlan() { return { type: FETCH_CLASS_PLAN }; }
  function fetchClassPlanSuccess(activeClassPlan) { return { type: FETCH_CLASS_PLAN_SUCCESS, activeClassPlan }; }
  function fetchClassPlanFailure(error) { return { type: FETCH_CLASS_PLAN_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestClassPlan(id));
    return classPlanService.fetchClassPlan(id)
      .then(
        (activeClassPlan) => {
          dispatch(fetchClassPlanSuccess(activeClassPlan));
        },
        (error) => {
          dispatch(fetchClassPlanFailure(error));
          history.push('/class-plans/1');
        },
      );
  };
};


// List all class plans
export const listClassPlans = (param) => {
  function requestListClassPlans() {
    return {
      type: LIST_CLASS_PLANS,
    };
  }

  function fetchListClassPlansSuccess(classPlans) {
    return {
      type: LIST_CLASS_PLANS_SUCCESS,
      classPlans,
    };
  }

  function fetchListClassPlansFailure(error) {
    return {
      type: LIST_CLASS_PLANS_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(requestListClassPlans(param));
    return classPlanService.listClassPlans(param)
      .then(
        (classPlans) => {
          dispatch(fetchListClassPlansSuccess(classPlans));
        },
        (error) => {
          dispatch(fetchListClassPlansFailure(error));
        },
      );
  };
};

// Create a new class plan
export const createClassPlan = (props) => {
  function createNewClassPlan() {
    return {
      type: CREATE_CLASS_PLAN,
    };
  }

  function createClassPlanSuccess(newClassPlan) {
    return {
      type: CREATE_CLASS_PLAN_SUCCESS,
      newClassPlan,
    };
  }

  function createClassPlanFailure(error) {
    return {
      type: CREATE_CLASS_PLAN_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(createNewClassPlan(props));
    return classPlanService.createClassPlan(props).then(
      (newClassPlan) => {
        dispatch(createClassPlanSuccess(newClassPlan));
        toast.success('Plano de aula criado com sucesso', optionsSuccess);
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(createClassPlanFailure(error));
      },
    );
  };
};


// Function: Update a class plan
export const updateClassPlan = (props) => {
  function updateActiveClassPlan() {
    return {
      type: UPDATE_CLASS_PLAN,
    };
  }

  function updateClassPlanSuccess(activeClassPlan) {
    return {
      type: UPDATE_CLASS_PLAN_SUCCESS,
      activeClassPlan,
    };
  }

  function updateClassPlanFailure(error) {
    return {
      type: UPDATE_CLASS_PLAN_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(updateActiveClassPlan(props));
    return classPlanService.updateClassPlan(props).then(
      (activeClassPlan) => {
        toast.success('Etiqueta atualizada com sucesso', optionsSuccess);
        dispatch(updateClassPlanSuccess(activeClassPlan));
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(updateClassPlanFailure(error));
      },
    );
  };
};


// delete a class plan
export const deleteClassPlan = (idClassPlan) => {
  function deleteSelectedClassPlan() {
    return {
      type: DELETE_CLASS_PLAN,
    };
  }

  function deleteClassPlanSuccess(idClassPlanRemoved) {
    return {
      type: DELETE_CLASS_PLAN_SUCCESS,
      idClassPlanRemoved,
    };
  }

  function deleteClassPlanFailure(error) {
    return {
      type: DELETE_CLASS_PLAN_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(deleteSelectedClassPlan(idClassPlan));
    return classPlanService.deleteClassPlan(idClassPlan)
      .then(
        (idClassPlanRemoved) => {
          dispatch(deleteClassPlanSuccess(idClassPlanRemoved));
        },
        (error) => {
          dispatch(deleteClassPlanFailure(error));
        },
      );
  };
};
