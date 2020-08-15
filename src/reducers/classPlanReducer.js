import {
  FETCH_CLASS_PLAN,
  FETCH_CLASS_PLAN_SUCCESS,
  FETCH_CLASS_PLAN_FAILURE,

  FETCH_PUBLIC_CLASS_PLAN,
  FETCH_PUBLIC_CLASS_PLAN_SUCCESS,
  FETCH_PUBLIC_CLASS_PLAN_FAILURE,

  LIST_CLASSPLAN_PAGE,
  LIST_CLASSPLAN_PAGE_SUCCESS,
  LIST_CLASSPLAN_PAGE_FAILURE,

  LIST_MY_CLASS_PLANS,
  LIST_MY_CLASS_PLANS_SUCCESS,
  LIST_MY_CLASS_PLANS_FAILURE,

  CREATE_CLASS_PLAN,
  CREATE_CLASS_PLAN_SUCCESS,
  CREATE_CLASS_PLAN_FAILURE,

  UPDATE_CLASS_PLAN,
  UPDATE_CLASS_PLAN_SUCCESS,
  UPDATE_CLASS_PLAN_FAILURE,

  DELETE_CLASS_PLAN,
  DELETE_CLASS_PLAN_SUCCESS,
  DELETE_CLASS_PLAN_FAILURE,

  ADD_SELECTED_OBJECT_CLASS_PLAN,
  REMOVE_SELECTED_OBJECT_CLASS_PLAN,
  RESET_SELECTED_OBJECTLIST_CLASS_PLAN,

  ADD_SELECTED_ACTIVITY_CLASS_PLAN,
  REMOVE_SELECTED_ACTIVITY_CLASS_PLAN,
  RESET_SELECTED_ACTIVITYLIST_CLASS_PLAN,

  ADD_SELECTED_DOCUMENT_CLASS_PLAN,
  REMOVE_SELECTED_DOCUMENT_CLASS_PLAN,
  RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN,

  ADD_SELECTED_ONLINETEST_CLASS_PLAN,
  REMOVE_SELECTED_ONLINETEST_CLASS_PLAN,
  RESET_SELECTED_ONLINETESTLIST_CLASS_PLAN,

  COPY_CLASS_PLAN,
  COPY_CLASS_PLAN_SUCCESS,
  COPY_CLASS_PLAN_FAILURE,
  COPY_CLASS_PLAN_VIEW_SUCCESS,

  SELECT_CLASS_PLAN_TYPE,
  RESET_CLASS_PLAN_TYPE,

  GENERATE_LINK_CLASS_PLAN,
  GENERATE_LINK_CLASS_PLAN_SUCCESS,
  GENERATE_LINK_CLASS_PLAN_FAILURE,

  SET_ACTIVITY_TO_NEW_CLASSPLAN,

  /* Class plan station */
  ADD_STATION_TO_CLASSPLAN,
  REMOVE_STATION_FROM_CLASSPLAN,
  RESET_STATIONS_CLASS_PLAN,
  ADD_MATERIAL_TO_CLASS_PLAN_STATION,
  REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION,

  GET_NUMBER_CLASSPLAN_PUBLIC_LINK,
  GET_NUMBER_CLASSPLAN_PUBLIC_LINK_SUCCESS,
  GET_NUMBER_CLASSPLAN_PUBLIC_LINK_FAILURE,

} from 'actions/classPlanAction';
import { toast } from 'react-toastify';


/* MATERIAL TYPE FOR STATIONS */
const MATERIAL_TYPE = {
  DOCUMENT: 'D',
  ONLINE_TEST: 'T',
  OBJECT: 'O',
  QUESTION: 'Q',
  ACTIVITY: 'A',
};

/* CLASS PLAN TYPE */
const CLASSPLAN_TYPE = {
  STATIONS: 'S',
  OPEN: 'T', /* before traditional, now Open */
};

const initialState = {
  classPlanPage: {},
  publicLink: '',
  classPlans: [],
  selectedObjectList: [],
  selectedDocumentList: [],
  selectedActivityList: [],
  selectedOnlineTestList: [],
  selectedClassPlanType: '',
  stations: [
    {
      activity_ids: null, document_ids: null, document_online_ids: null, material: null,
    },
    {
      activity_ids: null, document_ids: null, document_online_ids: null, material: null,
    },
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

export const classPlan = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASS_PLAN:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_CLASS_PLAN_SUCCESS: {
      const stationsPlan = action.activeClassPlan.plan_type !== CLASSPLAN_TYPE.STATIONS ? [] : action.activeClassPlan.stations.map((x) => {
        if (x.document) {
          return {
            activity_ids: null, document_ids: x.document.id, document_online_ids: null, material: x.document,
          };
        }
        if (x.document_online) {
          return {
            activity_ids: null, document_ids: null, document_online_ids: x.document_online.link, material: x.document_online,
          };
        }
        if (x.activity) {
          return {
            activity_ids: x.activity.id, document_ids: null, document_online_ids: null, material: x.activity,
          };
        }
        return {};
      });

      return Object.assign({}, state, {
        activeClassPlan: action.activeClassPlan,
        selectedObjectList: action.activeClassPlan.learning_objects,
        selectedActivityList: action.activeClassPlan.activities,
        selectedDocumentList: action.activeClassPlan.documents,
        selectedOnlineTestList: action.activeClassPlan.documents_online,
        stations: stationsPlan,
        isFetching: false,
        publicLink: '',

      });
    }
    case FETCH_CLASS_PLAN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case FETCH_PUBLIC_CLASS_PLAN:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_PUBLIC_CLASS_PLAN_SUCCESS:
      return Object.assign({}, state, {
        activePublicClassPlan: action.activePublicClassPlan,
        isFetching: false,
        error: null,
      });
    case FETCH_PUBLIC_CLASS_PLAN_FAILURE:
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
        isCreated: true,
      });
    case CREATE_CLASS_PLAN_FAILURE: {
      // const constMessageError = action.error ? action.error : ;
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isCreated: false,
        error: action.error,
      });
    }
    case UPDATE_CLASS_PLAN: {
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
      });
    }
    case UPDATE_CLASS_PLAN_SUCCESS: {
      return Object.assign({}, state, {
        activeClassPlan: { ...action.activeClassPlan },
        isUpdated: true,
      });
    }
    case UPDATE_CLASS_PLAN_FAILURE: {
      toast.error(action.error, optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    case DELETE_CLASS_PLAN: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_CLASS_PLAN_SUCCESS: {
      toast.success('Plano de aula removido com sucesso', optionsSuccess);
      // const newClassPlans = state.classPlans.results.filter(item => item.id !== action.idClassPlanRemoved);

      return Object.assign({}, state, {
        // classPlans: newClassPlans,
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
    case ADD_SELECTED_OBJECT_CLASS_PLAN: {
      if (state.selectedObjectList.filter(item => item.id === action.selectedObject.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedObjectList: [...state.selectedObjectList, action.selectedObject],
      });
    }
    case REMOVE_SELECTED_OBJECT_CLASS_PLAN: {
      const newSelectedObjectList = state.selectedObjectList.filter(item => item.id !== action.idObject);
      return Object.assign({}, state, {
        selectedObjectList: newSelectedObjectList,
      });
    }
    case RESET_SELECTED_OBJECTLIST_CLASS_PLAN: {
      return Object.assign({}, state, {
        selectedObjectList: [],
      });
    }
    case ADD_SELECTED_ACTIVITY_CLASS_PLAN: {
      if (state.selectedActivityList.filter(item => item.id === action.selectedActivity.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedActivityList: [...state.selectedActivityList, action.selectedActivity],
      });
    }
    case REMOVE_SELECTED_ACTIVITY_CLASS_PLAN: {
      const newSelectedActivityList = state.selectedActivityList.filter(item => item.id !== action.idActivity);
      return Object.assign({}, state, {
        selectedActivityList: newSelectedActivityList,
      });
    }
    case RESET_SELECTED_ACTIVITYLIST_CLASS_PLAN: {
      const newselectedActivityList = state.selectedActivityList.filter(item => item.id === state.activityIdAddedToClassPlan);
      return Object.assign({}, state, {
        selectedActivityList: newselectedActivityList,
        activityIdAddedToClassPlan: undefined,
      });
    }
    case ADD_SELECTED_DOCUMENT_CLASS_PLAN: {
      if (state.selectedDocumentList.filter(item => item.id === action.selectedDocument.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedDocumentList: [...state.selectedDocumentList, action.selectedDocument],
      });
    }
    case REMOVE_SELECTED_DOCUMENT_CLASS_PLAN: {
      const newSelectedDocumentList = state.selectedDocumentList.filter(item => item.id !== action.idDocument);
      return Object.assign({}, state, {
        selectedDocumentList: newSelectedDocumentList,
      });
    }
    case RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN: {
      return Object.assign({}, state, {
        selectedDocumentList: [],
      });
    }
    case ADD_SELECTED_ONLINETEST_CLASS_PLAN: {
      if (state.selectedOnlineTestList.filter(item => item.link === action.selectedOnlineTest.link).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedOnlineTestList: [...state.selectedOnlineTestList, action.selectedOnlineTest],
      });
    }
    case REMOVE_SELECTED_ONLINETEST_CLASS_PLAN: {
      const newSelectedOnlineTestList = state.selectedOnlineTestList.filter(item => item.link !== action.idOnlineTest);
      return Object.assign({}, state, {
        selectedOnlineTestList: newSelectedOnlineTestList,
      });
    }
    case RESET_SELECTED_ONLINETESTLIST_CLASS_PLAN: {
      return Object.assign({}, state, {
        selectedOnlineTestList: [],
      });
    }

    /* INI: Class Plan with stations */
    case ADD_STATION_TO_CLASSPLAN: {
      return Object.assign({}, state, {
        stations: [...state.stations, action.station],
      });
    }
    case REMOVE_STATION_FROM_CLASSPLAN: {
      const newStations = [...state.stations.filter((x, index) => index !== action.removedIndex)];
      return Object.assign({}, state, {
        stations: newStations,
      });
    }
    case RESET_STATIONS_CLASS_PLAN: {
      let activityid = null;
      let activityMaterial = null;
      if (state.selectedActivityList.length > 0 && state.selectedActivityList !== undefined) {
        activityid = state.selectedActivityList[0].id;
        activityMaterial = { ...state.selectedActivityList[0] };
      }

      return Object.assign({}, state, {
        stations: [
          {
            activity_ids: activityid, document_ids: null, document_online_ids: null, material: activityMaterial,
          },
          {
            activity_ids: null, document_ids: null, document_online_ids: null, material: null,
          },
        ],
      });
    }

    case ADD_MATERIAL_TO_CLASS_PLAN_STATION: {
      const updateStations = state.stations.map((x, index) => {
        if (index === action.stationIndex && action.typeMaterial === MATERIAL_TYPE.DOCUMENT) {
          return { ...x, document_ids: action.material.id, material: action.material };
        }
        if (index === action.stationIndex && action.typeMaterial === MATERIAL_TYPE.ACTIVITY) {
          return { ...x, activity_ids: action.material.id, material: action.material };
        }
        if (index === action.stationIndex && action.typeMaterial === MATERIAL_TYPE.ONLINE_TEST) {
          return { ...x, document_online_ids: action.material.link, material: action.material };
        }
        return x;
      });
      return Object.assign({}, state, {
        stations: updateStations,
      });
    }
    case REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION: {
      const updateStations = state.stations.map((x, index) => {
        if (index === action.stationIndex && x.document_ids) {
          return { ...x, document_ids: null, material: null };
        }
        if (index === action.stationIndex && x.document_online_ids) {
          return { ...x, document_online_ids: null, material: null };
        }
        if (index === action.stationIndex && x.activity_ids) {
          return { ...x, activity_ids: null, material: null };
        }
        return x;
      });
      return Object.assign({}, state, {
        stations: updateStations,
      });
    }
    /* FIN: UPDATE */

    case LIST_CLASSPLAN_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page,
        isFetching: true,
        error: null,
      });
    case LIST_CLASSPLAN_PAGE_SUCCESS:
      return Object.assign({}, state, {
        classPlanPage: action.classPlanPage,
        isFetching: false,
      });
    case LIST_CLASSPLAN_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case LIST_MY_CLASS_PLANS:
      return Object.assign({}, state, {
        classPlans: action.classPlans,
        isFetchingClassPlans: true,
        error: null,
        isDeleted: false,
        orderField: action.orderField,
        order: action.order,
        currentPage: action.page,
      });
    case LIST_MY_CLASS_PLANS_SUCCESS:
      return Object.assign({}, state, {
        classPlans: action.classPlans,
        isFetchingClassPlans: false,
        isDeleted: false,
      });
    case LIST_MY_CLASS_PLANS_FAILURE:
      return Object.assign({}, state, {
        isFetchingClassPlans: false,
        error: action.error,
        isDeleted: false,
      });
    case COPY_CLASS_PLAN: {
      toast.success('A cópia do plano de aula está em processo', optionsSuccess);
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
        isCopying: true,
      });
    }
    case COPY_CLASS_PLAN_SUCCESS: {
      toast.success('Cópia do plano de aula realizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isCopying: false,
        activeClassPlan: { ...action.activeClassPlan },
        classPlans: state.classPlans ? {
          ...state.classPlans,
          results: [...state.classPlans.results, { ...action.activeClassPlan }],
          count: state.classPlans.count + 1,
        } : {
          results: [action.activeClassPlan],
          count: 1,
        },
      });
    }
    case COPY_CLASS_PLAN_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isCopying: false,
        error: action.error,
      });
    }
    case COPY_CLASS_PLAN_VIEW_SUCCESS: {
      toast.success('Cópia do plano de aula realizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isCopying: false,
        activeClassPlan: { ...action.activeClassPlan },
      });
    }
    case SELECT_CLASS_PLAN_TYPE: {
      return Object.assign({}, state, {
        selectedClassPlanType: action.selectedClassPlanType,
      });
    }
    case RESET_CLASS_PLAN_TYPE: {
      return Object.assign({}, state, {
        selectedClassPlanType: '',
      });
    }
    case GENERATE_LINK_CLASS_PLAN: {
      return Object.assign({}, state, {
      });
    }
    case GENERATE_LINK_CLASS_PLAN_SUCCESS: {
      toast.success('Link público do plano de aula gerado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        publicLink: action.link.link,
      });
    }
    case GENERATE_LINK_CLASS_PLAN_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case SET_ACTIVITY_TO_NEW_CLASSPLAN: {
      return Object.assign({}, state, {
        activityIdAddedToClassPlan: action.activityIdAddedToClassPlan,
      });
    }
    case GET_NUMBER_CLASSPLAN_PUBLIC_LINK: {
      return Object.assign({}, state, {
        isFetchingClassPlanPublicLinks: true,
      });
    }
    case GET_NUMBER_CLASSPLAN_PUBLIC_LINK_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingClassPlanPublicLinks: false,
        numberClassPlanPublicLinks: action.numberClassPlanPublicLinks,
      });
    }
    case GET_NUMBER_CLASSPLAN_PUBLIC_LINK_FAILURE: {
      return Object.assign({}, state, {
        isFetchingClassPlanPublicLinks: false,
        error: action.error,
      });
    }

    default:
      return state;
  }
};

export default classPlan;
