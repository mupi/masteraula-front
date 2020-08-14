export const TOGGLE_MENU = 'TOGGLE_MENU';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const SELECTED_OPTION_SIDEBAR = 'SELECTED_OPTION_SIDEBAR';


export const toggleMenu = isOpen => ({
  type: TOGGLE_MENU,
  isOpen: !isOpen,
});

export const openSidebar = isOpenSidebar => ({
  type: OPEN_SIDEBAR,
  isOpenSidebar: !isOpenSidebar,
});

export const sidebarOptionSelected = idSidebar => ({
  type: SELECTED_OPTION_SIDEBAR,
  idSidebar,
});
