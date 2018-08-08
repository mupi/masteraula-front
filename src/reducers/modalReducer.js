/* --- REDUCERS --- */
import {
  OPEN_MODAL, CLOSE_MODAL
} from 'actions/modalAction';
const initialState = {
	modals: [],
}

function reducer(state = initial
State, action) {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				modals: state.modals.concat(action.obj)
			};
		case CLOSE_MODAL:
			return {
				...state,
				modals: state.modals.filter(item => item.id !== action.obj.id),
			};
		default:
			return state;
	}
};
export default reducer;
