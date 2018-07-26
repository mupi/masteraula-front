import {
    LIST_DISCIPLINE_FILTERS, LIST_DISCIPLINE_FILTERS_SUCCESS, LIST_DISCIPLINE_FILTERS_FAILURE,
    LIST_TEACHINGLEVEL_FILTERS, LIST_TEACHINGLEVEL_FILTERS_SUCCESS, LIST_TEACHINGLEVEL_FILTERS_FAILURE
} from 'actions/filterAction';

const initialState = {
  disciplineFilters:{},
  teachingLevelFilters:{},
}

export const filter = (state = initialState, action) => {
    switch (action.type) {

        case LIST_QUESTION_PAGE:
            return Object.assign({}, state, {
                currentPage : action.page,
                isFetching : true,
                error: null
            });
        case LIST_QUESTION_PAGE_SUCCESS:
            return Object.assign({}, state, {
                questionPage: action.questionPage,
                isFetching: false
            });
        case LIST_QUESTION_PAGE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            })
        case RATE_QUESTION:
            return Object.assign({}, state, {
                rating: action.rating
        })
        default:
            return state;
    }
}

export default question
