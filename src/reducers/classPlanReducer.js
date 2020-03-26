import {
  FETCH_CLASS_PLAN,
  FETCH_CLASS_PLAN_SUCCESS,
  FETCH_CLASS_PLAN_FAILURE,

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

  ADD_SELECTED_DOCUMENT_CLASS_PLAN,
  REMOVE_SELECTED_DOCUMENT_CLASS_PLAN,
  RESET_SELECTED_DOCUMENTLIST_CLASS_PLAN,

  COPY_CLASS_PLAN,
  COPY_CLASS_PLAN_SUCCESS,
  COPY_CLASS_PLAN_FAILURE,

  SELECT_CLASS_PLAN_TYPE,
  RESET_CLASS_PLAN_TYPE,

  /* Class plan station */
  ADD_STATION_TO_CLASSPLAN,
  REMOVE_STATION_FROM_CLASSPLAN,
  RESET_STATIONS_CLASS_PLAN,
  ADD_MATERIAL_TO_CLASS_PLAN_STATION,
  REMOVE_MATERIAL_FROM_CLASS_PLAN_STATION,

} from 'actions/classPlanAction';
import { toast } from 'react-toastify';

const initialState = {
  classPlans: [],
  selectedObjectList: [],
  selectedDocumentList: [],
  selectedClassPlanType: '',
  stations: [
    {
      learning_object_ids: null, document_ids: null, question_ids: null, material: null,
    },
    {
      learning_object_ids: null, document_ids: null, question_ids: null, material: null,
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
      const stationsPlan = action.activeClassPlan.plan_type !== 'S' ? [] : action.activeClassPlan.stations.map((x) => {
        if (x.document) {
          return {
            learning_object_ids: null, document_ids: x.document.id, question_ids: null, material: x.document,
          };
        }
        if (x.learning_object) {
          return {
            learning_object_ids: x.learning_object.id, document_ids: null, question_ids: null, material: x.learning_object,
          };
        }
        if (x.question) {
          return {
            learning_object_ids: null, document_ids: null, question_ids: x.question.id, material: x.question,
          };
        }
        return {};
      });

      return Object.assign({}, state, {
        activeClassPlan: action.activeClassPlan,
        selectedObjectList: action.activeClassPlan.learning_objects,
        selectedDocumentList: action.activeClassPlan.documents,
        stations: stationsPlan,
        isFetching: false,
      });
    }
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
      return Object.assign({}, state, {
        stations: [
          {
            learning_object_ids: null, document_ids: null, question_ids: null, material: null,
          },
          {
            learning_object_ids: null, document_ids: null, question_ids: null, material: null,
          },
        ],
      });
    }
    case ADD_MATERIAL_TO_CLASS_PLAN_STATION: {
      const updateStations = state.stations.map((x, index) => {
        if (index === action.stationIndex && action.typeMaterial === 'D') {
          return { ...x, document_ids: action.material.id, material: action.material };
        }
        if (index === action.stationIndex && action.typeMaterial === 'O') {
          return { ...x, learning_object_ids: action.material.id, material: action.material };
        }
        if (index === action.stationIndex && action.typeMaterial === 'Q') {
          return { ...x, question_ids: action.material.id, material: action.material };
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
        if (index === action.stationIndex && x.learning_object_ids) {
          return { ...x, learning_object_ids: null, material: null };
        }
        if (index === action.stationIndex && x.question_ids) {
          return { ...x, question_ids: null, material: null };
        }
        return x;
      });
      return Object.assign({}, state, {
        stations: updateStations,
      });
    }
    /* FIN: UPDATE */

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
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case COPY_CLASS_PLAN_SUCCESS: {
      toast.success('Cópia do plano de aula realizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
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
        error: action.error,
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


    default:
      return state;
  }
};

export default classPlan;
