import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar, 
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
