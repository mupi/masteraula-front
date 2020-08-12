import {
  classPlanService,
} from 'services';
import { toast } from 'react-toastify';
import { initialize } from 'redux-form';
import { listTopicFilters } from 'actions/filterClassPlanAction';

import { history } from 'helpers';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

// Load

export const FETCH_CLASS_PLAN = 'FETCH_CLASS_PLAN';
export const FETCH_CLASS_PLAN_SUCCESS = 'FETCH_CLASS_PLAN_SUCCESS';
export const FETCH_CLASS_PLAN_FAILURE = 'FETCH_CLASS_PLAN_FAILURE';

export const FETCH_PUBLIC_CLASS_PLAN = 'FETCH_PUBLIC_CLASS_PLAN';
export const FETCH_PUBLIC_CLASS_PLAN_SUCCESS = 'FETCH_PUBLIC_CLASS_PLAN_SUCCESS';
export const FETCH_PUBLIC_CLASS_PLAN_FAILURE = 'FETCH_PUBLIC_CLASS_PLAN_FAILURE';

export const LIST_CLASSPLAN_PAGE = 'LIST_CLASSPLAN_PAGE';
export const LIST_CLASSPLAN_PAGE_SUCCESS = 'LIST_CLASSPLAN_PAGE_SUCCESS';
export const LIST_CLASSPLAN_PAGE_FAILURE = 'LIST_CLASSPLAN_PAGE_FAILURE';

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

/* OPEN CLASS PLAN: Add/Remove activity */
export const ADD_SELECTED_ACTIVITY_CLASS_PLAN = 'ADD_SELECTED_ACTIVITY_CLASS_PLAN';
export const REMOVE_SELECTED_ACTIVITY_CLASS_PLAN = 'REMOVE_SELECTED_ACTIVITY_CLASS_PLAN';
export const RESET_SELECTED_ACTIVITYLIST_CLASS_PLAN = 'RESET_SELECTED_ACTIVITYLIST_CLASS_PLAN';

/* OPEN CLASS PLAN: Add/Remove document */
export const ADD_SELECTED_DOCUMENT_CLASS_PLAN = 'ADD_SELECTED_DOCUMENT_CLASS_PLAN';
export const REMOVE_SELECTED_DOCUMENT_CLASS_PLAN = 'REMOVE_SELECTED_DOCUMENT_CLASS_PLAN';
export const RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN = 'RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN';

/* OPEN CLASS PLAN:  Add/Remove online test */
export const ADD_SELECTED_ONLINETEST_CLASS_PLAN = 'ADD_SELECTED_ONLINETEST_CLASS_PLAN';
export const REMOVE_SELECTED_ONLINETEST_CLASS_PLAN = 'REMOVE_SELECTED_ONLINETEST_CLASS_PLAN';
export const RESET_SELECTED_ONLINETESTLIST_CLASS_PLAN = 'RESET_SELECTED_ONLINETESTLIST_CLASS_PLAN';

export const SELECT_CLASS_PLAN_TYPE = 'SELECT_CLASS_PLAN_TYPE';
export const RESET_CLASS_PLAN_TYPE = 'RESET_CLASS_PLAN_TYPE';

/* For generating public URL for class plan */
export const GENERATE_LINK_CLASS_PLAN = 'GENERATE_LINK_CLASS_PLAN';
export const GENERATE_LINK_CLASS_PLAN_SUCCESS = 'GENERATE_LINK_CLASS_PLAN_SUCCESS';
export const GENERATE_LINK_CLASS_PLAN_FAILURE = 'GENERATE_LINK_CLASS_PLAN_FAILURE';

/* Class Plan with stations */
export const ADD_STATION_TO_CLASSPLAN = 'ADD_STATION_TO_CLASSPLAN';
export const REMOVE_STATION_FROM_CLASSPLAN = 'REMOVE_STATION_FROM_CLASSPLAN';
export const RESET_STATIONS_CLASS_PLAN = 'RESET_STATIONS_CLASS_PLAN';

export const ADD_MATERIAL_TO_CLASS_PLAN_STATION = 'ADD_MATERIAL_TO_CLASS_PLAN_STATION';
export const REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION = 'REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION';

// Copy ClassPlan
export const COPY_CLASS_PLAN = 'COPY_CLASS_PLAN';
export const COPY_CLASS_PLAN_SUCCESS = 'COPY_CLASS_PLAN_SUCCESS';
export const COPY_CLASS_PLAN_FAILURE = 'COPY_CLASS_PLAN_FAILURE';

// Set activity that will added in new ClassPlan - Create class plan based on activity
export const SET_ACTIVITY_TO_NEW_CLASSPLAN = 'SET_ACTIVITY_TO_NEW_CLASSPLAN';

// Get public links
export const GET_NUMBER_CLASSPLAN_PUBLIC_LINK = 'GET_NUMBER_CLASSPLAN_PUBLIC_LINK';
export const GET_NUMBER_CLASSPLAN_PUBLIC_LINK_SUCCESS = 'GET_NUMBER_CLASSPLAN_PUBLIC_LINK_SUCCESS';
export const GET_NUMBER_CLASSPLAN_PUBLIC_LINK_FAILURE = 'GET_NUMBER_CLASSPLAN_PUBLIC_LINK_FAILURE';

// Select class plan's type: "T" (Traditional), "S" (Stations)
export const selectClassPlanType = selectedClassPlanType => ({
  type: SELECT_CLASS_PLAN_TYPE,
  selectedClassPlanType,
});

export const resetClassPlanType = () => ({
  type: RESET_CLASS_PLAN_TYPE,
});

/* Functions for Class Plan Station */
export const addStationToClassPlan = station => ({
  type: ADD_STATION_TO_CLASSPLAN,
  station,
});

export const removeStationFromClassPlan = removedIndex => ({
  type: REMOVE_STATION_FROM_CLASSPLAN,
  removedIndex,
});

export const resetStationsClassPlan = () => ({
  type: RESET_STATIONS_CLASS_PLAN,
});

export const addMaterialToClassPlanStation = (material, stationIndex, typeMaterial) => ({
  type: ADD_MATERIAL_TO_CLASS_PLAN_STATION, material, stationIndex, typeMaterial,
});

export const removeMaterialFromClassPlanStation = (stationIndex, typeMaterial) => ({
  type: REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION, stationIndex, typeMaterial,
});

export const fetchClassPlan = (id) => {
  function requestClassPlan() { return { type: FETCH_CLASS_PLAN }; }
  function fetchClassPlanSuccess(activeClassPlan) { return { type: FETCH_CLASS_PLAN_SUCCESS, activeClassPlan }; }
  function fetchClassPlanFailure(error) { return { type: FETCH_CLASS_PLAN_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestClassPlan(id));
    return classPlanService.fetchClassPlan(id)
      .then(
        (activeClassPlan) => {
          // initialize class plan Edit Page for owner's class plan
          dispatch(initialize('edit-classplan', {
            name: activeClassPlan.name,
            disciplines: activeClassPlan.disciplines,
            topics: activeClassPlan.topics,
            bncc: activeClassPlan.bncc,
            tags: activeClassPlan.tags.map(tag => tag.name.trim()).join(', '),
            teachingLevels: activeClassPlan.teaching_levels,
            teachingYears: activeClassPlan.teaching_years,
            duration: activeClassPlan.duration,
            phases: activeClassPlan.phases,
            content: activeClassPlan.content,
            guidelines: activeClassPlan.guidelines,
            stations: activeClassPlan.stations.map(x => ({ description_station: x.description_station, name_station: x.name_station })),

          }));

          dispatch(fetchClassPlanSuccess(activeClassPlan));
        },
        (error) => {
          dispatch(fetchClassPlanFailure(error));
          // history.push('/class-plans/1');
        },
      );
  };
};


export const fetchPublicClassPlan = link => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PUBLIC_CLASS_PLAN });
    const activePublicClassPlan = await classPlanService.fetchPublicClassPlan(link);
    dispatch({ type: FETCH_PUBLIC_CLASS_PLAN_SUCCESS, activePublicClassPlan });
  } catch {
    dispatch({ type: FETCH_PUBLIC_CLASS_PLAN_FAILURE });
  }
};

// listClassPlan using filters
export const listClassPlans = (page, filter) => {
  function requestClassPlanPage() { return { type: LIST_CLASSPLAN_PAGE, page }; }
  function fetchClassPlanPageSuccess(classPlanPage) { return { type: LIST_CLASSPLAN_PAGE_SUCCESS, classPlanPage }; }
  function fetchClassPlanPageFailure(error) { return { type: LIST_CLASSPLAN_PAGE_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().classPlan.isFetching) {
      return 1;
    }
    dispatch(listTopicFilters(filter, { classPlans: true }));
    dispatch(requestClassPlanPage());
    return classPlanService.listClassPlans(page, filter)
      .then(
        (classPlanPage) => {
          dispatch(fetchClassPlanPageSuccess(classPlanPage));
          dispatch(initialize('classPlanSearch', {
            searchText: filter.searchText,
            onlyMyClassPlans: filter.onlyMyClassPlans,
          }));
        },
        (error) => {
          dispatch(fetchClassPlanPageFailure(error));
          dispatch(initialize('classPlanSearch', {
            searchText: filter.searchText,
          }));
          history.push('/class-plans-base/1');
        },
      );
  };
};

export const getNumberClassPlanPublicLinks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_NUMBER_CLASSPLAN_PUBLIC_LINK });
    const numberClassPlanPublicLinks = await classPlanService.getNumberClassPlanPublicLinks();
    dispatch({ type: GET_NUMBER_CLASSPLAN_PUBLIC_LINK_SUCCESS, numberClassPlanPublicLinks });
  } catch {
    dispatch({ type: GET_NUMBER_CLASSPLAN_PUBLIC_LINK_FAILURE });
  }
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
        dispatch(resetStationsClassPlan());
        history.push(`/view-classplan/${newClassPlan.id}`);
        toast.success('Plano de aula criado com sucesso', optionsSuccess);
      },
      (error) => {
        // toast.error('Ocorreu um erro com sua solicitação', optionsError);
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
        toast.success('Plano de aula atualizado com sucesso', optionsSuccess);
        dispatch(updateClassPlanSuccess(activeClassPlan));
        dispatch(initialize('edit-classplan', {
          name: activeClassPlan.name,
          disciplines: activeClassPlan.disciplines,
          topics: activeClassPlan.topics,
          bncc: activeClassPlan.bncc,
          tags: activeClassPlan.tags.map(tag => tag.name.trim()).join(', '),
          teachingLevels: activeClassPlan.teaching_levels,
          teachingYears: activeClassPlan.teaching_years,
          duration: activeClassPlan.duration,
          phases: activeClassPlan.phases,
          content: activeClassPlan.content,
          guidelines: activeClassPlan.guidelines,
          stations: activeClassPlan.stations.map(x => ({ description_station: x.description_station, name_station: x.name_station })),
        }));
      },
      (error) => {
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

/* Generate public link for class plan */
export const generatePublicLink = id => async (dispatch) => {
  try {
    dispatch({ type: GENERATE_LINK_CLASS_PLAN });
    const link = await classPlanService.generatePublicLink(id);
    dispatch({ type: GENERATE_LINK_CLASS_PLAN_SUCCESS, link });
  } catch {
    dispatch({ type: GENERATE_LINK_CLASS_PLAN_FAILURE });
  }
};

/* OBJECTS */
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

/* ACTIVITY */
// Functions for create class plan based on Activity
export const setActivityIdToNewClassPlan = activitytId => ({
  type: SET_ACTIVITY_TO_NEW_CLASSPLAN,
  activityIdAddedToClassPlan: activitytId,
});

// Add Selected Activity to Class Plan
export const addSelectedActivityToClassPlan = selectedActivity => ({
  type: ADD_SELECTED_ACTIVITY_CLASS_PLAN, selectedActivity,
});

// Remove Selected Activity to Class Plan
export const removeSelectedActivityToClassPlan = idActivity => ({
  type: REMOVE_SELECTED_ACTIVITY_CLASS_PLAN, idActivity,
});

// Reset Selected Activity list before starting create/update class plan
export const resetSelectedActivities = () => ({
  type: RESET_SELECTED_ACTIVITYLIST_CLASS_PLAN,
});

/* DOCUMENT */
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


/* ONLINE - TEST */
// Add Selected Document to Class Plan
export const addSelectedOnlineTestToClassPlan = selectedOnlineTest => ({
  type: ADD_SELECTED_ONLINETEST_CLASS_PLAN, selectedOnlineTest,
});

// Remove Selected Document From Class Plan
export const removeSelectedOnlineTestFromClassPlan = idOnlineTest => ({
  type: REMOVE_SELECTED_ONLINETEST_CLASS_PLAN, idOnlineTest,
});

// Reset Selected Document list before starting create/update class plan
export const resetSelectedOnlineTests = () => ({
  type: RESET_SELECTED_ONLINETESTLIST_CLASS_PLAN,
});

export const copyClassPlan = (props) => {
  function copySelectedDocument() { return { type: COPY_CLASS_PLAN }; }
  function copySelectedDocumentSuccess(activeClassPlan) { return { type: COPY_CLASS_PLAN_SUCCESS, activeClassPlan }; }
  function copySelectedDocumentFailure(error) { return { type: COPY_CLASS_PLAN_FAILURE, error }; }
  return (dispatch) => {
    dispatch(copySelectedDocument(props));
    return classPlanService.copyClassPlan(props).then(
      (activeClassPlan) => {
        dispatch(copySelectedDocumentSuccess(activeClassPlan));
      },
      (error) => {
        dispatch(copySelectedDocumentFailure(error));
      },
    );
  };
};
