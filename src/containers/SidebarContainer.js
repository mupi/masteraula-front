import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);