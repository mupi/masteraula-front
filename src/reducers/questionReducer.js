import { RATE_QUESTION , ADD_QUESTION} from "actions/questionAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = {}

export function question (state = initialState, action)  {
    switch (action.type) {
        case ADD_QUESTION:
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
