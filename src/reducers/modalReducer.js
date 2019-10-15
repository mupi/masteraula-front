import {
  GENERAL_TOGGLE_MODAL, GENERAL_SHOW_MODAL, GENERAL_HIDE_MODAL,
} from 'actions/modalAction';

const initialState = {
  modalType: null,
  modalProps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modal: action.modal,
      });
    }
    case GENERAL_SHOW_MODAL:
      return Object.assign({}, state, {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      });
    case GENERAL_HIDE_MODAL:
      return Object.assign({}, state, {
        modalProps: Object.assign({}, state.modalProps, {
          open: false,
        }),
      });
    default:
      return state;
  }
};
