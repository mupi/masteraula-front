import {
  FETCH_HEADER, FETCH_HEADER_SUCCESS, FETCH_HEADER_FAILURE,
  CREATE_HEADER, CREATE_HEADER_SUCCESS, CREATE_HEADER_FAILURE, RESET_NEW_HEADER,
  UPDATE_HEADER, UPDATE_HEADER_SUCCESS, UPDATE_HEADER_FAILURE,
  LIST_MY_HEADERS, LIST_MY_HEADERS_SUCCESS, LIST_MY_HEADERS_FAILURE,
  DELETE_HEADER, DELETE_HEADER_SUCCESS, DELETE_HEADER_FAILURE,
} from 'actions/headerAction';
import { toast } from 'react-toastify';

const initialState = {
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const header = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEADER:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetching: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_HEADER_SUCCESS:
      localStorage.setItem('activeHeader', JSON.stringify(state.activeHeader));
      return Object.assign({}, state, {
        activeHeader: action.activeHeader,
        isFetching: false,
      });
    case FETCH_HEADER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case CREATE_HEADER:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        actionHeader: action.newHeader,
        isFetching: false,
      });
    case CREATE_HEADER_SUCCESS: {
      toast.success('Cabeçalho criado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        actionHeader: action.newHeader,
        isFetching: false,
      });
    }
    case CREATE_HEADER_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    }
    case RESET_NEW_HEADER:
      return Object.assign({}, state, {
        actionHeader: null,
      });
    case LIST_MY_HEADERS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        myHeadersList: null,
        isFetchingMyHeaders: true,
        currentPage: action.page,
        error: null,
        isDeleted: false,
        orderField: action.orderField,
        order: action.order,
      });
    case LIST_MY_HEADERS_SUCCESS:
      return Object.assign({}, state, {
        myHeadersList: action.myHeadersList,
        isFetchingMyHeaders: false,
      });
    case LIST_MY_HEADERS_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        myHeadersList: null,
        isFetchingMyHeaders: false,
        error: action.errorMessage,
      });
    case UPDATE_HEADER: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_HEADER_SUCCESS: {
      toast.success('Cabeçalho atualizado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeHeader: { ...action.activeHeader },
        isUpdated: true,
      });
    }
    case UPDATE_HEADER_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    case DELETE_HEADER: {
      return Object.assign({}, state, {
        isDeletingHeader: true,
        isDeleted: false,
      });
    }
    case DELETE_HEADER_SUCCESS: {
      const newList = state.myHeadersList.results.filter(item => item.id !== action.idHeaderRemoved);
      let newActive = state.activeHeader;
      if (state.activeHeader && state.activeHeader.id === action.idHeaderRemoved) {
        newActive = null;
        localStorage.setItem('activeHeader', null);
      }
      toast.success('Cabeçalho removido com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeHeader: newActive,
        isDeleted: true,
        myHeadersList: { ...state.myHeadersList, count: state.myHeadersList.count - 1, results: newList },
      });
    }
    case DELETE_HEADER_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    default:
      return state;
  }
};

export default header;
