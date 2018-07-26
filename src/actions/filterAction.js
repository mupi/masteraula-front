import { filterService } from 'services';

// List Discipline Filters
export const LIST_DISCIPLINE_FILTERS = 'LIST_DISCIPLINE_FILTERS';
export const LIST_DISCIPLINE_FILTERS_SUCCESS = 'LIST_DISCIPLINE_FILTERS_SUCCESS';
export const LIST_DISCIPLINE_FILTERS_FAILURE = 'LIST_DISCIPLINE_FILTERS_FAILURE';

// List TeachingLevel Filters
export const LIST_TEACHINGLEVEL_FILTERS = 'LIST_TEACHINGLEVEL_FILTERS';
export const LIST_TEACHINGLEVEL_FILTERS_SUCCESS = 'LIST_TEACHINGLEVEL_FILTERS_SUCCESS';
export const LIST_TEACHINGLEVEL_FILTERS_FAILURE = 'LIST_TEACHINGLEVEL_FILTERS_FAILURE';

// Discipline List
export const listDisciplineFilters = (param) => {
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

  function requestListDisciplineFilters() { return { type: LIST_DISCIPLINE_FILTERS }; }
  function fetchListDisciplineFiltersSuccess(disciplineFilters) { return { type: LIST_DISCIPLINE_FILTERS_SUCCESS, disciplineFilters }; }
  function fetchListDisciplineFiltersFailure(error) { return { type: LIST_DISCIPLINE_FILTERS_FAILURE, error }; }
};


// TeachingLevel List
export const listTeachingLevelFilters = () => {
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

  function requestListTeachingLevelFilters() { return { type: LIST_TEACHINGLEVEL_FILTERS }; }
  function fetchListTeachingLevelFiltersSuccess(teachingLevelFilters) { return { type: LIST_TEACHINGLEVEL_FILTERS_SUCCESS, teachingLevelFilters }; }
  function fetchListTeachingLevelFiltersFailure(error) { return { type: LIST_TEACHINGLEVEL_FILTERS_FAILURE, error }; }
};
