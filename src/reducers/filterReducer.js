import {
  LIST_DISCIPLINE_FILTERS,
  LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
  LIST_TEACHINGLEVEL_FILTERS,
  LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE,
  LIST_SOURCE_FILTERS,
  LIST_SOURCE_FILTERS_SUCCESS, LIST_SOURCE_FILTERS_FAILURE,
  LIST_YEAR_FILTERS,
  LIST_YEAR_FILTERS_SUCCESS, LIST_YEAR_FILTERS_FAILURE,
  ADD_SELECTED_DISCIPLINE_FILTER,
  REMOVE_SELECTED_DISCIPLINE_FILTER,
  ADD_SELECTED_TEACHINGLEVEL_FILTER,
  REMOVE_SELECTED_TEACHINGLEVEL_FILTER,
  ADD_SELECTED_DIFFICULTY_FILTER,
  REMOVE_SELECTED_DIFFICULTY_FILTER,
  ADD_SELECTED_SOURCE_FILTER,
  REMOVE_SELECTED_SOURCE_FILTER,
  ADD_SELECTED_YEAR_FILTER,
  REMOVE_SELECTED_YEAR_FILTER,
  SET_SEARCH_TEXT,
  CLEAR_SELECTED_FILTERS, CLEAR_SEARCH,
} from 'actions/filterAction';

const initialState = {
  disciplineFilters: [],
  teachingLevelFilters: [],
  disciplinesSelected: [],
  teachingLevelsSelected: [],
  difficultiesSelected: [],
  difficultyFilters: [
    { id: 'E', name: 'Fácil' },
    { id: 'M', name: 'Médio' },
    { id: 'H', name: 'Difícil' },
  ],
};

export const filter = (state = initialState, action) => {
  switch (action.type) {
    case LIST_DISCIPLINE_FILTERS:
      return Object.assign({}, state, {
        disciplineFilters: action.disciplineFilters,
        isFetchingDisciplineFilters: true,
        error: null,
      });
    case LIST_DISCIPLINE_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        disciplineFilters: action.disciplineFilters,
        isFetchingDisciplineFilters: false,
      });
    case LIST_DISCIPLINE_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingDisciplineFilters: false,
        error: action.error,
      });
    case LIST_TEACHINGLEVEL_FILTERS:
      return Object.assign({}, state, {
        teachingLevelFilters: action.teachingLevelFilters,
        isFetchingTeachingLevelFilters: true,
        error: null,
      });
    case LIST_TEACHINGLEVEL_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        teachingLevelFilters: action.teachingLevelFilters,
        isFetchingTeachingLevelFilters: false,
      });
    case LIST_TEACHINGLEVEL_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingTeachingLevelFilters: false,
        error: action.error,
      });
    case LIST_SOURCE_FILTERS:
      return Object.assign({}, state, {
        sourceFilters: action.sourceFilters,
        isFetchingSourceFilters: true,
        error: null,
      });
    case LIST_SOURCE_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        sourceFilters: action.sourceFilters,
        isFetchingSourceFilters: false,
      });
    case LIST_SOURCE_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingSourceFilters: false,
        error: action.error,
      });
    case LIST_YEAR_FILTERS:
      return Object.assign({}, state, {
        yearFilters: action.yearFilters,
        isFetchingYearFilters: true,
        error: null,
      });
    case LIST_YEAR_FILTERS_SUCCESS:
      return Object.assign({}, state, {
        yearFilters: action.yearFilters,
        isFetchingYearFilters: false,
      });
    case LIST_YEAR_FILTERS_FAILURE:
      return Object.assign({}, state, {
        isFetchingYearFilters: false,
        error: action.error,
      });
    case ADD_SELECTED_DISCIPLINE_FILTER: {
      const filterDiscipline = state.disciplineFilters.filter(item => item.id === parseInt(action.idDiscipline, 10));
      if (state.disciplinesSelected.filter(item => item.id === filterDiscipline[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        disciplinesSelected: [...state.disciplinesSelected, filterDiscipline[0]],
      });
    }
    case REMOVE_SELECTED_DISCIPLINE_FILTER: {
      const newDisciplines = state.disciplinesSelected.filter(item => item.id !== parseInt(action.idDiscipline, 10));
      return Object.assign({}, state, {
        disciplinesSelected: newDisciplines,
      });
    }
    case ADD_SELECTED_TEACHINGLEVEL_FILTER: {
      const filterTeachingL = state.teachingLevelFilters.filter(item => item.id === parseInt(action.idTeachingLevel, 10));
      if (state.teachingLevelsSelected.filter(item => item.id === filterTeachingL[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        teachingLevelsSelected: [...state.teachingLevelsSelected, filterTeachingL[0]],
      });
    }
    case REMOVE_SELECTED_TEACHINGLEVEL_FILTER: {
      const newTeachingLevels = state.teachingLevelsSelected.filter(item => item.id !== parseInt(action.idTeachingLevel, 10));
      return Object.assign({}, state, {
        teachingLevelsSelected: newTeachingLevels,
      });
    }
    case ADD_SELECTED_DIFFICULTY_FILTER: {
      const filterDifficulty = state.difficultyFilters.filter(item => item.id === action.difficultyType);
      if (state.difficultiesSelected.filter(item => item.id === filterDifficulty[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        difficultiesSelected: [...state.difficultiesSelected, filterDifficulty[0]],
      });
    }
    case REMOVE_SELECTED_DIFFICULTY_FILTER: {
      const newDifficulties = state.difficultiesSelected.filter(item => item.id !== action.difficultyType);
      return Object.assign({}, state, {
        difficultiesSelected: newDifficulties,
      });
    }
    case ADD_SELECTED_SOURCE_FILTER: {
      const filterSource = state.sourceFilters.filter(item => item.id === action.idSource);
      if (state.sourcesSelected.filter(item => item.id === filterSource[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        sourcesSelected: [...state.sourcesSelected, filterSource[0]],
      });
    }
    case REMOVE_SELECTED_SOURCE_FILTER: {
      const newSources = state.sourcesSelected.filter(item => item.id !== action.idSource);
      return Object.assign({}, state, {
        sourcesSelected: newSources,
      });
    }
    case ADD_SELECTED_YEAR_FILTER: {
      const filterYear = state.yearFilters.filter(item => item.id === action.idYear);
      if (state.yearsSelected.filter(item => item.id === filterYear[0].id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        yearsSelected: [...state.yearsSelected, filterYear[0]],
      });
    }
    case REMOVE_SELECTED_YEAR_FILTER: {
      const newYears = state.yearsSelected.filter(item => item.id !== action.idYear);
      return Object.assign({}, state, {
        yearsSelected: newYears,
      });
    }
    case SET_SEARCH_TEXT: {
      return Object.assign({}, state, {
        searchText: action.searchText,
      });
    }
    case CLEAR_SELECTED_FILTERS: {
      return Object.assign({}, state, {
        disciplinesSelected: [],
        teachingLevelsSelected: [],
        difficultiesSelected: [],
      });
    }
    case CLEAR_SEARCH: {
      return Object.assign({}, state, {
        searchText: '',
      });
    }
    default:
      return state;
  }
};

export default filter;
