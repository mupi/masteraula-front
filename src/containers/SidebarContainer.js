import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);