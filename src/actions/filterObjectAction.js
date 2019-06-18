// Add selected object type filter
export const ADD_SELECTED_TYPEOBJECT_FILTER = 'ADD_SELECTED_TYPEOBJECT_FILTER';

// Remove selected object type filter
export const REMOVE_SELECTED_TYPEOBJECT_FILTER = 'REMOVE_SELECTED_TYPEOBJECT_FILTER';

// Set search text for Learning object
export const SET_SEARCH_TEXT_OBJECT = 'SET_SEARCH_TEXT_OBJECT';


// Clear all filters selected
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';

// Add Selected object type filter
export const addSelectedObjectTypeFilter = objectType => ({
  type: ADD_SELECTED_TYPEOBJECT_FILTER, objectType,
});

// Remove Selected object type filter
export const removeSelectedObjectTypeFilter = objectType => ({
  type: REMOVE_SELECTED_TYPEOBJECT_FILTER, objectType,
});

export const setSearchTextObject = searchText => ({
  type: SET_SEARCH_TEXT_OBJECT, searchText,
});

export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS,
});
