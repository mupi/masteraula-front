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

// List Topic Filters (Redação, Morfologia, Análisis Combinatório)
export const LIST_TOPIC_FILTERS = 'LIST_TOPIC_FILTERS';
export const LIST_TOPIC_FILTERS_SUCCESS = 'LIST_TOPIC_FILTERS_SUCCESS';
export const LIST_TOPIC_FILTERS_FAILURE = 'LIST_TOPIC_FILTERS_FAILURE';
export const RESET_LIST_TOPIC_SELECTED = 'RESET_LIST_TOPIC_SELECTED';

// List Teaching Year (1eiro, 2do, 3eiro)
export const LIST_TEACHING_YEAR_FILTERS = 'LIST_TEACHING_YEAR_FILTERS';
export const LIST_TEACHING_YEAR_FILTERS_SUCCESS = 'LIST_TEACHING_YEAR_FILTERS_SUCCESS';
export const LIST_TEACHING_YEAR_FILTERS_FAILURE = 'LIST_TEACHING_YEAR_FILTERS_FAILURE';

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

// Add selected TOPIC filter
export const ADD_SELECTED_TOPIC_FILTER = 'ADD_SELECTED_TOPIC_FILTER';

// Remove selected TOPIC filter
export const REMOVE_SELECTED_TOPIC_FILTER = 'REMOVE_SELECTED_TOPIC_FILTER';

// Add selected MYQUESTION LABEL filter
export const ADD_SELECTED_MYQUESTION_LABEL_FILTER = 'ADD_SELECTED_MYQUESTION_LABEL_FILTER';

// Remove selected MYQUESTION LABEL filter
export const REMOVE_SELECTED_MYQUESTION_LABEL_FILTER = 'REMOVE_SELECTED_MYQUESTION_LABEL_FILTER';

// Set search text
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

// Set search text for Learning object
export const SET_SEARCH_TEXT_OBJECT = 'SET_SEARCH_TEXT_OBJECT';

// Set my questions filter (My questions check)
export const ADD_MYQUESTIONS_FILTER = 'ADD_MYQUESTIONS_FILTER';
// Set my questions filter (My questions check - in MODAL)
export const ADD_MYQUESTIONS_FILTER_MODAL = 'ADD_MYQUESTIONS_FILTER_MODAL';

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

// Teaching Year List
export const listTeachingYearFilters = () => {
  function requestListTeachingYearFilters() {
    return { type: LIST_TEACHING_YEAR_FILTERS };
  }
  function fetchListTeachingYearFiltersSuccess(teachingYearFilters) {
    return { type: LIST_TEACHING_YEAR_FILTERS_SUCCESS, teachingYearFilters };
  }
  function fetchListTeachingYearFiltersFailure(error) {
    return { type: LIST_TEACHING_YEAR_FILTERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(requestListTeachingYearFilters());
    return filterService.listTeachingYearFilters()
      .then(
        (teachingYearFilters) => {
          dispatch(fetchListTeachingYearFiltersSuccess(teachingYearFilters));
        },
        (error) => {
          dispatch(fetchListTeachingYearFiltersFailure(error));
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

// Add Selected TOPIC filter
export const addSelectedTopicFilter = topic => ({
  type: ADD_SELECTED_TOPIC_FILTER, topic,
});

// Remove Selected TOPIC filter
export const removeSelectedTopicFilter = idTopic => ({
  type: REMOVE_SELECTED_TOPIC_FILTER, idTopic,
});

// Add Selected MYQUESTIONLABEL filter
export const addSelectedMyQuestionLabelFilter = myQuestionLabel => ({
  type: ADD_SELECTED_MYQUESTION_LABEL_FILTER, myQuestionLabel,
});

// Remove Selected MYQUESTIONLABEL filter
export const removeSelectedMyQuestionLabelFilter = idMyQuestionLabel => ({
  type: REMOVE_SELECTED_MYQUESTION_LABEL_FILTER, idMyQuestionLabel,
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

export const addMyQuestionsFilter = (author, onlyMyQuestions) => ({
  type: ADD_MYQUESTIONS_FILTER, onlyMyQuestions, author,
});

export const clearSelectedFilters = () => ({
  type: CLEAR_SELECTED_FILTERS,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});


/* Busca no modal */
// Set search text for Question - Modal
export const SET_SEARCH_TEXT_MODAL = 'SET_SEARCH_TEXT_MODAL';

export const setSearchTextQuestionModal = searchTextModal => ({
  type: SET_SEARCH_TEXT_MODAL, searchTextModal,
});

export const addMyQuestionsFilterModal = (author, onlyMyQuestionsModal) => ({
  type: ADD_MYQUESTIONS_FILTER_MODAL, onlyMyQuestionsModal, author,
});
