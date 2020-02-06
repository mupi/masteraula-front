import {
  classPlanService,
} from 'services';
import { toast } from 'react-toastify';

import { history } from 'helpers';

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

export const LIST_MY_CLASS_PLANS = 'LIST_MY_CLASS_PLANS';
export const LIST_MY_CLASS_PLANS_SUCCESS = 'LIST_MY_CLASS_PLANS_SUCCESS';
export const LIST_MY_CLASS_PLANS_FAILURE = 'LIST_MY_CLASS_PLANS_FAILURE';

export const CREATE_CLASS_PLAN = 'CREATE_CLASS_PLAN';
export const CREATE_CLASS_PLAN_SUCCESS = 'CREATE_CLASS_PLAN_SUCCESS';
export const CREATE_CLASS_PLAN_FAILURE = 'CREATE_CLASS_PLAN_FAILURE';

export const UPDATE_CLASS_PLAN = 'UPDATE_CLASS_PLAN';
export const UPDATE_CLASS_PLAN_SUCCESS = 'UPDATE_CLASS_PLAN_SUCCESS';
export const UPDATE_CLASS_PLAN_FAILURE = 'UPDATE_CLASS_PLAN_FAILURE';

export const DELETE_CLASS_PLAN = 'DELETE_CLASS_PLAN';
export const DELETE_CLASS_PLAN_SUCCESS = 'DELETE_CLASS_PLAN_SUCCESS';
export const DELETE_CLASS_PLAN_FAILURE = 'DELETE_CLASS_PLAN_FAILURE';

export const ADD_SELECTED_OBJECT_CLASS_PLAN = 'ADD_SELECTED_OBJECT_CLASS_PLAN';
export const REMOVE_SELECTED_OBJECT_CLASS_PLAN = 'REMOVE_SELECTED_OBJECT_CLASS_PLAN';
export const RESET_SELECTED_OBJECTLIST_CLASS_PLAN = 'RESET_SELECTED_OBJECTLIST_CLASS_PLAN';

export const ADD_SELECTED_DOCUMENT_CLASS_PLAN = 'ADD_SELECTED_DOCUMENT_CLASS_PLAN';
export const REMOVE_SELECTED_DOCUMENT_CLASS_PLAN = 'REMOVE_SELECTED_DOCUMENT_CLASS_PLAN';
export const RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN = 'RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN';

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
export const listMyClassPlans = (page, orderField, order) => {
  function requestMyListClassPlans() {
    return {
      type: LIST_MY_CLASS_PLANS,
      page,
      orderField,
      order,
    };
  }

  function fetchListMyClassPlansSuccess(classPlans) {
    return {
      type: LIST_MY_CLASS_PLANS_SUCCESS,
      classPlans,
    };
  }

  function fetchListMyClassPlansFailure(error) {
    return {
      type: LIST_MY_CLASS_PLANS_FAILURE,
      error,
    };
  }
  return (dispatch) => {
    dispatch(requestMyListClassPlans(page, orderField, order));
    return classPlanService.listMyClassPlans(page, orderField, order)
      .then(
        (classPlans) => {
          dispatch(fetchListMyClassPlansSuccess(classPlans));
        },
        (error) => {
          dispatch(fetchListMyClassPlansFailure(error));
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
        history.push(`/view-classplan/${newClassPlan.id}`);
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
export const deleteClassPlan = (idClassPlan, isRedirect = false) => {
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
          if (isRedirect) {
            history.push('/class-plans/1');
          }
        },
        (error) => {
          dispatch(deleteClassPlanFailure(error));
        },
      );
  };
};

// Add Selected Object to Class Plan
export const addSelectedObjectToClassPlan = selectedObject => ({
  type: ADD_SELECTED_OBJECT_CLASS_PLAN, selectedObject,
});

// Remove Selected Object to Class Plan
export const removeSelectedObjectToClassPlan = idObject => ({
  type: REMOVE_SELECTED_OBJECT_CLASS_PLAN, idObject,
});

// Reset Selected Object list before starting create/update class plan
export const resetSelectedObjects = () => ({
  type: RESET_SELECTED_OBJECTLIST_CLASS_PLAN,
});


// Add Selected Document to Class Plan
export const addSelectedDocumentToClassPlan = selectedDocument => ({
  type: ADD_SELECTED_DOCUMENT_CLASS_PLAN, selectedDocument,
});

// Remove Selected Document From Class Plan
export const removeSelectedDocumentFromClassPlan = idDocument => ({
  type: REMOVE_SELECTED_DOCUMENT_CLASS_PLAN, idDocument,
});

// Reset Selected Document list before starting create/update class plan
export const resetSelectedDocuments = () => ({
  type: RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN,
});
