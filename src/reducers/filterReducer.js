import {
  LIST_DISCIPLINE_FILTERS,
  LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
  LIST_TEACHINGLEVEL_FILTERS,
  LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE,
  ADD_SELECTED_DISCIPLINE_FILTER,
  REMOVE_SELECTED_DISCIPLINE_FILTER,
  ADD_SELECTED_TEACHINGLEVEL_FILTER,
  REMOVE_SELECTED_TEACHINGLEVEL_FILTER,
  ADD_SELECTED_DIFFICULTY_FILTER,
  REMOVE_SELECTED_DIFFICULTY_FILTER,
  SET_SEARCH_TEXT,
  CLEAR_SELECTED_FILTERS,
} from 'actions/filterAction';

const initialState = {
  disciplineFilters: [],
  teachingLevelFilters: [],
  disciplinesSelected: [],
  teachingLevelsSelected: [],
  difficultiesSelected: [],
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
    case ADD_SELECTED_DISCIPLINE_FILTER:
      return Object.assign({}, state, {
        disciplinesSelected: [...state.disciplinesSelected, action.idDiscipline],
      });
    case REMOVE_SELECTED_DISCIPLINE_FILTER: {
      const newDisciplines = state.disciplinesSelected.filter(item => item !== action.idDiscipline);
      return Object.assign({}, state, {
        disciplinesSelected: newDisciplines,
      });
    }
    case ADD_SELECTED_TEACHINGLEVEL_FILTER:
      return Object.assign({}, state, {
        teachingLevelsSelected: [...state.teachingLevelsSelected, action.idTeachingLevel],
      });
    case REMOVE_SELECTED_TEACHINGLEVEL_FILTER: {
      const newTeachingLevels = state.teachingLevelsSelected.filter(item => item !== action.idTeachingLevel);
      return Object.assign({}, state, {
        teachingLevelsSelected: newTeachingLevels,
      });
    }
    case ADD_SELECTED_DIFFICULTY_FILTER:
      return Object.assign({}, state, {
        difficultiesSelected: [...state.difficultiesSelected, action.difficultyType],
      });
    case REMOVE_SELECTED_DIFFICULTY_FILTER: {
      const newDifficulties = state.difficultiesSelected.filter(item => item !== action.difficultyType)
      return Object.assign({}, state, {
        difficultiesSelected: newDifficulties,
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
    default:
      return state;
  }
};

export default filter;
