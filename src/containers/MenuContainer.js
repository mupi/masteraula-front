import { connect } from 'react-redux';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';

import Menu from 'components/menu/Menu';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: state.session.session,
  activeDocument: state.document.activeDocument,

});

const mapDispatchToProps = dispatch => ({
  toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
  logout: () => dispatch(logout()),
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

export default MenuContainer;
