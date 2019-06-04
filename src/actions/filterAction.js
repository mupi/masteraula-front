import { filterService } from 'services';

// List Discipline Filters
export const LIST_DISCIPLINE_FILTERS = 'LIST_DISCIPLINE_FILTERS';
export const LIST_DISCIPLINE_FILTERS_SUCCESS = 'LIST_DISCIPLINE_FILTERS_SUCCESS';
export const LIST_DISCIPLINE_FILTERS_FAILURE = 'LIST_DISCIPLINE_FILTERS_FAILURE';

// List TeachingLevel Filters
export const LIST_TEACHINGLEVEL_FILTERS = 'LIST_TEACHINGLEVEL_FILTERS';
export const LIST_TEACHINGLEVEL_FILTERS_SUCCESS = 'LIST_TEACHINGLEVEL_FILTERS_SUCCESS';
export const LIST_TEACHINGLEVEL_FILTERS_FAILURE = 'LIST_TEACHINGLEVEL_FILTERS_FAILURE';

// List Source Filters (UNICAMP, ENEM)
export const LIST_SOURCE_FILTERS = 'LIST_SOURCE_FILTERS';
export const LIST_SOURCE_FILTERS_SUCCESS = 'LIST_SOURCE_FILTERS_SUCCESS';
export const LIST_SOURCE_FILTERS_FAILURE = 'LIST_SOURCE_FILTERS_FAILURE';

// List Years Filters (2010, 2011)
export const LIST_YEAR_FILTERS = 'LIST_YEAR_FILTERS';
export const LIST_YEAR_FILTERS_SUCCESS = 'LIST_YEAR_FILTERS_SUCCESS';
export const LIST_YEAR_FILTERS_FAILURE = 'LIST_YEAR_FILTERS_FAILURE';

// Add selected discipline filter
export const ADD_SELECTED_DISCIPLINE_FILTER = 'ADD_SELECTED_DISCIPLINE_FILTER';

// Remove selected discipline filter
export const REMOVE_SELECTED_DISCIPLINE_FILTER = 'REMOVE_SELECTED_DISCIPLINE_FILTER';

// Add selected teachingLevel filter
export const ADD_SELECTED_TEACHINGLEVEL_FILTER = 'ADD_SELECTED_TEACHINGLEVEL_FILTER';

// Remove selected teachingLevel filter
export const REMOVE_SELECTED_TEACHINGLEVEL_FILTER = 'REMOVE_SELECTED_TEACHINGLEVEL_FILTER';

// Add selected difficulty filter
export const ADD_SELECTED_DIFFICULTY_FILTER = 'ADD_SELECTED_DIFFICULTY_FILTER';

// Remove selected difficulty filter
export const REMOVE_SELECTED_DIFFICULTY_FILTER = 'REMOVE_SELECTED_DIFFICULTY_FILTER';

// Add selected source filter
export const ADD_SELECTED_SOURCE_FILTER = 'ADD_SELECTED_SOURCE_FILTER';

// Remove selected source filter
export const REMOVE_SELECTED_SOURCE_FILTER = 'REMOVE_SELECTED_SOURCE_FILTER';

// Add selected year filter
export const ADD_SELECTED_YEAR_FILTER = 'ADD_SELECTED_YEAR_FILTER';

// Remove selected year filter
export const REMOVE_SELECTED_YEAR_FILTER = 'REMOVE_SELECTED_YEAR_FILTER';

// Set search text
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

// Set my questions filter (My questions check)
export const SET_MYQUESTIONS_FILTER = 'SET_MYQUESTIONS_FILTER';

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

// Source List
export const listSourceFilters = () => {
  function requestListSourceFilters() {
    return { type: LIST_SOURCE_FILTERS };
  }
  function fetchListSourceFiltersSuccess(sourceFilters) {
    return { type: LIST_SOURCE_FILTERS_SUCCESS, sourceFilters };
  }
  function fetchListSourceFiltersFailure(error) {
    return { type: LIST_SOURCE_FILTERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(requestListSourceFilters());
    return filterService.listSourceFilters()
      .then(
        (sourceFilters) => {
          dispatch(fetchListSourceFiltersSuccess(sourceFilters));
        },
        (error) => {
          dispatch(fetchListSourceFiltersFailure(error));
        },
      );
  };
};

// Year List
export const listYearFilters = () => {
  function requestListYearFilters() {
    return { type: LIST_YEAR_FILTERS };
  }
  function fetchListYearFiltersSuccess(yearFilters) {
    return { type: LIST_YEAR_FILTERS_SUCCESS, yearFilters };
  }
  function fetchListYearFiltersFailure(error) {
    return { type: LIST_YEAR_FILTERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(requestListYearFilters());
    return filterService.listYearFilters()
      .then(
        (yearFilters) => {
          dispatch(fetchListYearFiltersSuccess(yearFilters));
        },
        (error) => {
          dispatch(fetchListYearFiltersFailure(error));
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

// Add Selected Source filter
export const addSelectedSourceFilter = (idSource, nameSource = 'default') => ({
  type: ADD_SELECTED_SOURCE_FILTER, idSource, nameSource,
});

// Remove Selected Source filter
export const removeSelectedSourceFilter = idSource => ({
  type: REMOVE_SELECTED_SOURCE_FILTER, idSource,
});

// Add Selected Year filter
export const addSelectedYearFilter = (idYear, nameYear = 'default') => ({
  type: ADD_SELECTED_YEAR_FILTER, idYear, nameYear,
});

// Remove Selected Year filter
export const removeSelectedYearFilter = idYear => ({
  type: REMOVE_SELECTED_YEAR_FILTER, idYear,
});

export const setSearchText = searchText => ({
  type: SET_SEARCH_TEXT, searchText,
});

export const setMyQuestionsFilter = onlyMyQuestions => ({
  type: SET_MYQUESTIONS_FILTER, onlyMyQuestions,
});

export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS,
});
 
export const clearSearch = () => ({
  type: CLEAR_SEARCH,
}); 
