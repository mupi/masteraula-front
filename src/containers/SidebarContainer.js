import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  activeDocument: state.document.activeDocument,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
