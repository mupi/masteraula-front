import {
  GENERAL_TOGGLE_MODAL,
} from 'actions/modalAction';

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case ActionTypes.HIDE_MODAL:
      return initialState
    default:
      return state

    case GENERAL_TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modal: action.modal,
      });
    }
  }
}
