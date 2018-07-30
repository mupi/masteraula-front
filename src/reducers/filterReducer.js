import {
  LIST_DISCIPLINE_FILTERS,
  LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
  LIST_TEACHINGLEVEL_FILTERS,
  LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE,
  ADD_SELECTED_DISCIPLINE_FILTER,
  ADD_SELECTED_DISCIPLINE_FILTER_SUCCESS, ADD_SELECTED_DISCIPLINE_FILTER_FAILURE,
  REMOVE_SELECTED_DISCIPLINE_FILTER,
  REMOVE_SELECTED_DISCIPLINE_FILTER_SUCCESS, REMOVE_SELECTED_DISCIPLINE_FILTER_FAILURE
} from 'actions/filterAction';

const initialState = {
  disciplineFilters: [],
  teachingLevelFilters: [],
  disciplineFiltersSelected: [],
  teachingLevelFiltersSelected: [],
  difficultyFiltersSelected: [],
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
        disciplineFiltersSelected: [...state.disciplineFiltersSelected,
          action.idDiscipline],
        teachingLevelFiltersSelected: [...state.teachingLevelFiltersSelected],
        difficultyFiltersSelected: [...state.difficultyFiltersSelected],
      });
    case REMOVE_SELECTED_DISCIPLINE_FILTER: {
      const newDisciplineFilters = state.disciplineFiltersSelected.filter(item => item !== action.idDiscipline)
      return {
        disciplineFiltersSelected: newDisciplineFilters,
        teachingLevelFiltersSelected: [...state.teachingLevelFiltersSelected],
        difficultyFiltersSelected: [...state.difficultyFiltersSelected],
      };
    }
    default:
      return state;
  }
};

export default filter;
