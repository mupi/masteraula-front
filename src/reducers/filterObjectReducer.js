import {
  ADD_SELECTED_TYPEOBJECT_FILTER,
  REMOVE_SELECTED_TYPEOBJECT_FILTER,
  SET_SEARCH_TEXT_OBJECT,
  CLEAR_SELECTED_FILTERS,
  SET_SEARCH_TEXT_OBJECT_MODAL,
} from 'actions/filterObjectAction';

const initialState = {
  typesObjectSelected: [],
  typeObjectFilters: [
    { id: 'I', name: 'Imagem' },
    { id: 'T', name: 'Texto' },
  ],
};

export const filterObject = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_TYPEOBJECT_FILTER: {
      const filterObjectType = state.typeObjectFilters.filter(item => item.id === action.objectType);
      if (state.typesObjectSelected.filter(item => item.id === filterObjectType[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        typesObjectSelected: [...state.typesObjectSelected, filterObjectType[0]],
      });
    }
    case REMOVE_SELECTED_TYPEOBJECT_FILTER: {
      const newTypes = state.typesObjectSelected.filter(item => item.id !== action.objectType);
      return Object.assign({}, state, {
        typesObjectSelected: newTypes,
      });
    }

    case CLEAR_SELECTED_FILTERS: {
      return Object.assign({}, state, {
        typesObjectSelected: [],
      });
    }

    case SET_SEARCH_TEXT_OBJECT: {
      return Object.assign({}, state, {
        searchTextObject: action.searchText,
      });
    }

    case SET_SEARCH_TEXT_OBJECT_MODAL: {
      return Object.assign({}, state, {
        searchTextObjectModal: action.searchText,
      });
    }

    default:
      return state;
  } 
};

export default filterObject;
