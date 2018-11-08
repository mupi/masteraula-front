import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { openSidebar } from 'actions/menuAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
