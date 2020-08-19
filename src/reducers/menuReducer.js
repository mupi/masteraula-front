import { TOGGLE_MENU, OPEN_SIDEBAR, SELECTED_OPTION_SIDEBAR } from 'actions/menuAction';

const initialState = { isOpen: false, isOpenSidebar: false };

export function menu(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        isOpen: action.isOpen,
      });
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        isOpenSidebar: action.isOpenSidebar,
      });
    case SELECTED_OPTION_SIDEBAR:
      return Object.assign({}, state, {
        idSidebar: action.idSidebar,
      });

    default:
      return state;
  }
}

export default menu;
