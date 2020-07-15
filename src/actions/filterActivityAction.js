import { filterService } from 'services';

// List Discipline Filters
export const LIST_DISCIPLINE_FILTERS = 'LIST_DISCIPLINE_FILTERS';
export const LIST_DISCIPLINE_FILTERS_SUCCESS = 'LIST_DISCIPLINE_FILTERS_SUCCESS';
export const LIST_DISCIPLINE_FILTERS_FAILURE = 'LIST_DISCIPLINE_FILTERS_FAILURE';

// List TeachingLevel Filters
export const LIST_TEACHINGLEVEL_FILTERS = 'LIST_TEACHINGLEVEL_FILTERS';
export const LIST_TEACHINGLEVEL_FILTERS_SUCCESS = 'LIST_TEACHINGLEVEL_FILTERS_SUCCESS';
export const LIST_TEACHINGLEVEL_FILTERS_FAILURE = 'LIST_TEACHINGLEVEL_FILTERS_FAILURE';

// List Topic Filters (Redação, Morfologia, Análisis Combinatório)
export const LIST_TOPIC_FILTERS = 'LIST_TOPIC_FILTERS';
export const LIST_TOPIC_FILTERS_SUCCESS = 'LIST_TOPIC_FILTERS_SUCCESS';
export const LIST_TOPIC_FILTERS_FAILURE = 'LIST_TOPIC_FILTERS_FAILURE';
export const RESET_LIST_TOPIC_SELECTED = 'RESET_LIST_TOPIC_SELECTED';

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


// Add selected year filter
export const ADD_SELECTED_YEAR_FILTER = 'ADD_SELECTED_YEAR_FILTER';

// Remove selected year filter
export const REMOVE_SELECTED_YEAR_FILTER = 'REMOVE_SELECTED_YEAR_FILTER';
// Add selected difficulty filter
export const ADD_SELECTED_DIFFICULTY_FILTER = 'ADD_SELECTED_DIFFICULTY_FILTER';

// Remove selected difficulty filter
export const REMOVE_SELECTED_DIFFICULTY_FILTER = 'REMOVE_SELECTED_DIFFICULTY_FILTER';

// Add selected TOPIC filter
export const ADD_SELECTED_TOPIC_FILTER = 'ADD_SELECTED_TOPIC_FILTER';

// Remove selected TOPIC filter
export const REMOVE_SELECTED_TOPIC_FILTER = 'REMOVE_SELECTED_TOPIC_FILTER';

// Set search text
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

// Set search text for Learning object
export const SET_SEARCH_TEXT_OBJECT = 'SET_SEARCH_TEXT_OBJECT';

// Set my activities filter (My activities check)
export const ADD_MYACTIVITIES_FILTER = 'ADD_MYACTIVITIES_FILTER';
// Set my activities filter (My activities check - in MODAL)
export const ADD_MYACTIVITIES_FILTER_MODAL = 'ADD_MYACTIVITIES_FILTER_MODAL';

// Clear all filters selected
export const CLEAR_SELECTED_FILTERS = 'CLEAR_SELECTED_FILTERS';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const CLEAN_SEARCH_INPUT = 'CLEAN_SEARCH_INPUT';

// Discipline List
export const listDisciplineFilters = () => {
  function requestListDisciplineFilters() { return { type: LIST_DISCIPLINE_FILTERS }; }
  function fetchListDisciplineFiltersSuccess(disciplineFilters) {
    return { type: LIST_DISCIPLINE_FILTERS_SUCCESS, disciplineFilters };
  }
  function fetchListDisciplineFiltersFailure(error) {
    return { type: LIST_DISCIPLINE_FILTERS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListDisciplineFilters());
    return filterService.listDisciplineFilters()
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
// List all topics filters
export const listTopicFilters = (filter, activities) => {
  function requestListTopics() { return { type: LIST_TOPIC_FILTERS }; }
  function fetchListTopicsSuccess(topicFilters) {
    return { type: LIST_TOPIC_FILTERS_SUCCESS, topicFilters };
  }
  function fetchListTopicsFailure(error) {
    return { type: LIST_TOPIC_FILTERS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListTopics(filter));
    return filterService.listTopicFilters(filter, activities)
      .then(
        (topicFilters) => {
          dispatch(fetchListTopicsSuccess(topicFilters));
        },
        (error) => {
          dispatch(fetchListTopicsFailure(error));
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

// Add Selected Year filter
export const addSelectedYearFilter = (idYear, nameYear = 'default') => ({
  type: ADD_SELECTED_YEAR_FILTER, idYear, nameYear,
});

// Remove Selected Year filter
export const removeSelectedYearFilter = idYear => ({
  type: REMOVE_SELECTED_YEAR_FILTER, idYear,
});

// Add Selected Difficulty filter
export const addSelectedDifficultyFilter = difficultyType => ({
  type: ADD_SELECTED_DIFFICULTY_FILTER, difficultyType,
});

// Remove Selected Difficulty filter
export const removeSelectedDifficultyFilter = difficultyType => ({
  type: REMOVE_SELECTED_DIFFICULTY_FILTER, difficultyType,
});

// Add Selected TOPIC filter
export const addSelectedTopicFilter = topic => ({
  type: ADD_SELECTED_TOPIC_FILTER, topic,
});

// Remove Selected TOPIC filter
export const removeSelectedTopicFilter = idTopic => ({
  type: REMOVE_SELECTED_TOPIC_FILTER, idTopic,
});

// Reset topic list
export const resetTopicListSelected = () => ({
  type: RESET_LIST_TOPIC_SELECTED,
});


export const setSearchText = searchText => ({
  type: SET_SEARCH_TEXT, searchText,
});

export const cleanSearchInput = () => ({
  type: CLEAN_SEARCH_INPUT,
});

export const addMyActivitiesFilter = (author, onlyMyActivities) => ({
  type: ADD_MYACTIVITIES_FILTER, onlyMyActivities, author,
});

export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});


/* Busca no modal */
// Set search text for Activity - Modal
export const SET_SEARCH_TEXT_MODAL = 'SET_SEARCH_TEXT_MODAL';

export const setSearchTextActivityModal = searchTextModal => ({
  type: SET_SEARCH_TEXT_MODAL, searchTextModal,
});

export const addMyActivitiesFilterModal = (author, onlyMyActivitiesModal) => ({
  type: ADD_MYACTIVITIES_FILTER_MODAL, onlyMyActivitiesModal, author,
});
