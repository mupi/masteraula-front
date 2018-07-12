import {
    FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE,
    RATE_QUESTION
} from 'actions/questionAction';

const initialState = {
  activeQuestion:{question:null, error:null},
}

export const question = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_QUESTION:
            return Object.assign({}, state, {
                isFetching : true,
                error: null
            });
        break;
        case FETCH_QUESTION_SUCCESS:
            return Object.assign({}, state, {
                activeQuestion: action.question,
                isFetching: false
            });
        break;
        case FETCH_QUESTION_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            })
        break;
        case RATE_QUESTION:
            return Object.assign({}, state, {
                rating: action.rating
        })
        break;
        default:
            return state;
    }
}

export default question
