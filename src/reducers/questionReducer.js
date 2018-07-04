import { RATE_QUESTION } from "actions/questionAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = session ? { session: session.user, modal: false } : {}

export const question = (state = {}, action) => {
    switch (action.type) {
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
