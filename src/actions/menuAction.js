export const TOGGLE_MENU = 'TOGGLE_MENU'
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'

export const toggleMenu = isOpen => ({
  type: TOGGLE_MENU,
   isOpen : !isOpen
})

export const openSidebar = isOpenSidebar => ({
  type: 'OPEN_SIDEBAR',
  isOpenSidebar: !isOpenSidebar
})