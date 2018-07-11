import { RATE_QUESTION , CREATE_QUESTION} from 'actions/questionAction';

const initialState = {}

export const question = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                id: action.id,
                timestamp: action.timestamp,
                rating: 0
            }

        case RATE_QUESTION:
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                }
        default :
            return state
    }
}

export default question
