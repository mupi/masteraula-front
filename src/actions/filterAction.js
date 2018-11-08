import { filterService } from 'services';

// List Discipline Filters
export const LIST_DISCIPLINE_FILTERS = 'LIST_DISCIPLINE_FILTERS';
export const LIST_DISCIPLINE_FILTERS_SUCCESS = 'LIST_DISCIPLINE_FILTERS_SUCCESS';
export const LIST_DISCIPLINE_FILTERS_FAILURE = 'LIST_DISCIPLINE_FILTERS_FAILURE';

// List TeachingLevel Filters
export const LIST_TEACHINGLEVEL_FILTERS = 'LIST_TEACHINGLEVEL_FILTERS';
export const LIST_TEACHINGLEVEL_FILTERS_SUCCESS = 'LIST_TEACHINGLEVEL_FILTERS_SUCCESS';
export const LIST_TEACHINGLEVEL_FILTERS_FAILURE = 'LIST_TEACHINGLEVEL_FILTERS_FAILURE';


// Add selected discipline filter
export const ADD_SELECTED_DISCIPLINE_FILTER = 'ADD_SELECTED_DISCIPLINE_FILTER';

// Remove selected discipline filter
export const REMOVE_SELECTED_DISCIPLINE_FILTER = 'REMOVE_SELECTED_DISCIPLINE_FILTER';

// Add selected teachingLevel filter
export const ADD_SELECTED_TEACHINGLEVEL_FILTER = 'ADD_SELECTED_TEACHINGLEVEL_FILTER';

// Remove selected teachingLevel filter
export const REMOVE_SELECTED_TEACHINGLEVEL_FILTER = 'REMOVE_SELECTED_TEACHINGLEVEL_FILTER';

// Add selected teachingLevel filter
export const ADD_SELECTED_DIFFICULTY_FILTER = 'ADD_SELECTED_DIFFICULTY_FILTER';

// Remove selected teachingLevel filter
export const REMOVE_SELECTED_DIFFICULTY_FILTER = 'REMOVE_SELECTED_DIFFICULTY_FILTER';

// Remove selected teachingLevel filter
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

// Clear all filters selected
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';


// Discipline List
export const listDisciplineFilters = (param) => {
  function requestListDisciplineFilters() { return { type: LIST_DISCIPLINE_FILTERS }; }
  function fetchListDisciplineFiltersSuccess(disciplineFilters) {
    return { type: LIST_DISCIPLINE_FILTERS_SUCCESS, disciplineFilters };
  }
  function fetchListDisciplineFiltersFailure(error) {
    return { type: LIST_DISCIPLINE_FILTERS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListDisciplineFilters(param));
    return filterService.listDisciplineFilters(param)
      .then(
        (disciplineFilters) => {
          dispatch(fetchListDisciplineFiltersSuccess(disciplineFilters));
        },
        (error) => {
          dispatch(fetchListDisciplineFiltersFailure(error));
        },
      );
  };
};


// TeachingLevel List
export const listTeachingLevelFilters = () => {
  function requestListTeachingLevelFilters() {
    return { type: LIST_TEACHINGLEVEL_FILTERS };
  }
  function fetchListTeachingLevelFiltersSuccess(teachingLevelFilters) {
    return { type: LIST_TEACHINGLEVEL_FILTERS_SUCCESS, teachingLevelFilters };
  }
  function fetchListTeachingLevelFiltersFailure(error) {
    return { type: LIST_TEACHINGLEVEL_FILTERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(requestListTeachingLevelFilters());
    return filterService.listTeachingLevelFilters()
      .then(
        (teachingLevelFilters) => {
          dispatch(fetchListTeachingLevelFiltersSuccess(teachingLevelFilters));
        },
        (error) => {
          dispatch(fetchListTeachingLevelFiltersFailure(error));
        },
      );
  };
};

// Add Selected Discipline filter
export const addSelectedDisciplineFilter = idDiscipline => ({
  type: ADD_SELECTED_DISCIPLINE_FILTER, idDiscipline,
});

// Remove Selected Discipline filter
export const removeSelectedDisciplineFilter = idDiscipline => ({
  type: REMOVE_SELECTED_DISCIPLINE_FILTER, idDiscipline,
});

// Add Selected TeachingLevel filter
export const addSelectedTeachingLevelFilter = idTeachingLevel => ({
  type: ADD_SELECTED_TEACHINGLEVEL_FILTER, idTeachingLevel,
});

// Remove Selected TeachingLevel filter
export const removeSelectedTeachingLevelFilter = idTeachingLevel => ({
  type: REMOVE_SELECTED_TEACHINGLEVEL_FILTER, idTeachingLevel,
});

// Add Selected Difficulty filter
export const addSelectedDifficultyFilter = difficultyType => ({
  type: ADD_SELECTED_DIFFICULTY_FILTER, difficultyType,
});

// Remove Selected Difficulty filter
export const removeSelectedDifficultyFilter = difficultyType => ({
  type: REMOVE_SELECTED_DIFFICULTY_FILTER, difficultyType,
});


export const setSearchText = searchText => ({
  type: SET_SEARCH_TEXT, searchText,
});


export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});
