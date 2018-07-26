import { filterService } from 'services';

//List Discipline Filters
export const LIST_DISCIPLINE_FILTERS= 'LIST_DISCIPLINE_FILTERS'
export const LIST_DISCIPLINE_FILTERS_SUCCESS = 'LIST_DISCIPLINE_FILTERS_SUCCESS'
export const LIST_DISCIPLINE_FILTERS_FAILURE = 'LIST_DISCIPLINE_FILTERS_FAILURE'

//List TeachingLevel Filters
export const LIST_TEACHINGLEVEL_FILTERS= 'LIST_TEACHINGLEVEL_FILTERS'
export const LIST_TEACHINGLEVEL_FILTERS_SUCCESS = 'LIST_TEACHINGLEVEL_FILTERS_SUCCESS'
export const LIST_TEACHINGLEVEL_FILTERS_FAILURE = 'LIST_TEACHINGLEVEL_FILTERS_FAILURE'

//Discipline List
export const listDisciplineFilters = () => {
  return dispatch => {
    dispatch(requestListDisciplineFilters())
    return filterService.listDisciplineFilters()
      .then(
        disciplineFilters => {
          dispatch(fetchtListDisciplineFiltersSuccess(disciplineFilters))
        },
        error => {
          dispatch(fetchtListDisciplineFiltersFailure(error))
        }
      )
  }

  function requestListDisciplineFilters(){ return { type: LIST_DISCIPLINE_FILTERS } }
  function fetchtListDisciplineFiltersSuccess(disciplineFilters){ return { type: LIST_DISCIPLINE_FILTERS_SUCCESS, disciplineFilters } }
  function fetchtListDisciplineFiltersFailure(error){ return { type: LIST_DISCIPLINE_FILTERS_FAILURE, error } }
}



//TeachingLevel List
export const listTeachingLevelFilters = () => {
  return dispatch => {
    dispatch(requestListTeachingLevelFilters())
    return filterService.listTeachingLevelFilters()
      .then(
        teachingLevelFilters => {
          dispatch(fetchListTeachingLevelSuccess(teachingLevelFilters))
        },
        error => {
          dispatch(fetchListTeachingLevelFailure(error))
        }
      )
  }

  function requestListTeachingLevelFilters(){ return { type: LIST_TEACHINGLEVEL_FILTERS } }
  function fetchListTeachingLevelFiltersSuccess(teachingLevelFilters){ return { type: LIST_TEACHINGLEVEL_FILTERS_SUCCESS, teachingLevelFilters } }
  function fetchListTeachingLevelFiltersFailure(error){ return { type: LIST_TEACHINGLEVEL_FILTERS_FAILURE, error } }
}
