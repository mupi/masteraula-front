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
export const LIST_TOPIC_FILTERS_C = 'LIST_TOPIC_FILTERS';
export const LIST_TOPIC_FILTERS_C_SUCCESS = 'LIST_TOPIC_FILTERS_SUCCESS';
export const LIST_TOPIC_FILTERS_C_FAILURE = 'LIST_TOPIC_FILTERS_FAILURE';
export const RESET_LIST_TOPIC_SELECTED_C = 'RESET_LIST_TOPIC_SELECTED';

// List Years Filters (2010, 2011)
export const LIST_YEAR_FILTERS = 'LIST_YEAR_FILTERS';
export const LIST_YEAR_FILTERS_SUCCESS = 'LIST_YEAR_FILTERS_SUCCESS';
export const LIST_YEAR_FILTERS_FAILURE = 'LIST_YEAR_FILTERS_FAILURE';


// Add selected discipline filter
export const ADD_SELECTED_DISCIPLINE_FILTER_C = 'ADD_SELECTED_DISCIPLINE_FILTER_C';

// Remove selected discipline filter
export const REMOVE_SELECTED_DISCIPLINE_FILTER_C = 'REMOVE_SELECTED_DISCIPLINE_FILTER_C';

// Add selected teachingLevel filter
export const ADD_SELECTED_TEACHINGLEVEL_FILTER_C = 'ADD_SELECTED_TEACHINGLEVEL_FILTER_C';

// Remove selected teachingLevel filter
export const REMOVE_SELECTED_TEACHINGLEVEL_FILTER_C = 'REMOVE_SELECTED_TEACHINGLEVEL_FILTER_C';


// Add selected year filter
export const ADD_SELECTED_YEAR_FILTER_C = 'ADD_SELECTED_YEAR_FILTER_C';

// Remove selected year filter
export const REMOVE_SELECTED_YEAR_FILTER_C = 'REMOVE_SELECTED_YEAR_FILTER_C';
// Add selected difficulty filter
export const ADD_SELECTED_DIFFICULTY_FILTER_C = 'ADD_SELECTED_DIFFICULTY_FILTER_C';

// Remove selected difficulty filter
export const REMOVE_SELECTED_DIFFICULTY_FILTER_C = 'REMOVE_SELECTED_DIFFICULTY_FILTER_C';

// Add selected TOPIC filter
export const ADD_SELECTED_TOPIC_FILTER_C = 'ADD_SELECTED_TOPIC_FILTER_C';

// Remove selected TOPIC filter
export const REMOVE_SELECTED_TOPIC_FILTER_C = 'REMOVE_SELECTED_TOPIC_FILTER_C';

// Set search text
export const SET_SEARCH_TEXT_C = 'SET_SEARCH_TEXT_C';

// Set search text for Learning object
export const SET_SEARCH_TEXT_OBJECT = 'SET_SEARCH_TEXT_OBJECT';

// Set my classPlans filter (My classPlans check)
export const ADD_MYCLASSPLANS_FILTER = 'ADD_MYCLASSPLANS_FILTER';
// Set my classPlans filter (My classPlans check - in MODAL)
export const ADD_MYCLASSPLANS_FILTER_MODAL = 'ADD_MYCLASSPLANS_FILTER_MODAL';

// Clear all filters selected
export const CLEAR_SELECTED_FILTERS_C = 'CLEAR_SELECTED_FILTERS_C';

export const CLEAR_SEARCH_C = 'CLEAR_SEARCH_C';

export const CLEAN_SEARCH_INPUT_C = 'CLEAN_SEARCH_INPUT_C';

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
export const listTopicFilters = (filter, classPlans) => {
  function requestListTopics() { return { type: LIST_TOPIC_FILTERS_C }; }
  function fetchListTopicsSuccess(topicFilters) {
    return { type: LIST_TOPIC_FILTERS_C_SUCCESS, topicFilters };
  }
  function fetchListTopicsFailure(error) {
    return { type: LIST_TOPIC_FILTERS_C_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListTopics(filter));
    return filterService.listTopicFilters(filter, classPlans)
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
  type: ADD_SELECTED_DISCIPLINE_FILTER_C, idDiscipline,
});

// Remove Selected Discipline filter
export const removeSelectedDisciplineFilter = idDiscipline => ({
  type: REMOVE_SELECTED_DISCIPLINE_FILTER_C, idDiscipline,
});

// Add Selected TeachingLevel filter
export const addSelectedTeachingLevelFilter = idTeachingLevel => ({
  type: ADD_SELECTED_TEACHINGLEVEL_FILTER_C, idTeachingLevel,
});

// Remove Selected TeachingLevel filter
export const removeSelectedTeachingLevelFilter = idTeachingLevel => ({
  type: REMOVE_SELECTED_TEACHINGLEVEL_FILTER_C, idTeachingLevel,
});

// Add Selected Year filter
export const addSelectedYearFilter = (idYear, nameYear = 'default') => ({
  type: ADD_SELECTED_YEAR_FILTER_C, idYear, nameYear,
});

// Remove Selected Year filter
export const removeSelectedYearFilter = idYear => ({
  type: REMOVE_SELECTED_YEAR_FILTER_C, idYear,
});

// Add Selected Difficulty filter
export const addSelectedDifficultyFilter = difficultyType => ({
  type: ADD_SELECTED_DIFFICULTY_FILTER_C, difficultyType,
});

// Remove Selected Difficulty filter
export const removeSelectedDifficultyFilter = difficultyType => ({
  type: REMOVE_SELECTED_DIFFICULTY_FILTER_C, difficultyType,
});

// Add Selected TOPIC filter
export const addSelectedTopicFilter = topic => ({
  type: ADD_SELECTED_TOPIC_FILTER_C, topic,
});

// Remove Selected TOPIC filter
export const removeSelectedTopicFilter = idTopic => ({
  type: REMOVE_SELECTED_TOPIC_FILTER_C, idTopic,
});

// Reset topic list
export const resetTopicListSelected = () => ({
  type: RESET_LIST_TOPIC_SELECTED_C,
});


export const setSearchText = searchText => ({
  type: SET_SEARCH_TEXT_C, searchText,
});

export const cleanSearchInput = () => ({
  type: CLEAN_SEARCH_INPUT_C,
});

export const addMyClassPlansFilter = (author, onlyMyClassPlans) => ({
  type: ADD_MYCLASSPLANS_FILTER, onlyMyClassPlans, author,
});

export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS_C,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH_C,
});

/* Busca no modal */
export const SET_SEARCH_TEXT_MODAL_C = 'SET_SEARCH_TEXT_MODAL_C';

export const setSearchTextClassPlanModal = searchTextModal => ({
  type: SET_SEARCH_TEXT_MODAL_C, searchTextModal,
});

export const addMyClassPlansFilterModal = (author, onlyMyClassPlansModal) => ({
  type: ADD_MYCLASSPLANS_FILTER_MODAL, onlyMyClassPlansModal, author,
});
