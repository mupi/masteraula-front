import {
    LIST_DISCIPLINE_FILTERS, LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
    LIST_TEACHINGLEVEL_FILTERS, LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE
} from 'actions/filterAction';

const initialState = {
  disciplineFilters:[],
  teachingLevelFilters:[],
}

export const filter = (state = initialState, action) => {
    switch (action.type) {

        case LIST_DISCIPLINE_FILTERS:
            return Object.assign({}, state, {
                disciplineFilters : action.disciplineFilters,
                isFetchingDisciplineFilters : true,
                error: null
            });
        case LIST_DISCIPLINE_FILTERS_SUCCESS:
            return Object.assign({}, state, {
                disciplineFilters: action.disciplineFilters,
                isFetchingDisciplineFilters: false
            });
        case LIST_DISCIPLINE_FILTERS_FAILURE:
            return Object.assign({}, state, {
                isFetchingDisciplineFilters: false,
                error: action.error
            })
        case LIST_TEACHINGLEVEL_FILTERS:
                return Object.assign({}, state, {
                    teachingLevelFilters : action.teachingLevelFilters,
                    isFetchingTeachingLevelFilters : true,
                    error: null
            });
        case LIST_TEACHINGLEVEL_FILTERS_SUCCESS:
                return Object.assign({}, state, {
                    teachingLevelFilters: action.teachingLevelFilters,
                    isFetchingTeachingLevelFilters: false
            });
        case LIST_TEACHINGLEVEL_FILTERS_FAILURE:
                return Object.assign({}, state, {
                    isFetchingTeachingLevelFilters: false,
                    error: action.error
            })
        default:
            return state;
    }
}

export default filter
