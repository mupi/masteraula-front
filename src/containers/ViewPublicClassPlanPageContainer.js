import { connect } from 'react-redux';
import ViewPublicClassPlanPage from 'pages/ClassPlan/ViewPublicClassPlanPage';

import { fetchClassPlan, fetchPublicClassPlan } from 'actions/classPlanAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  error: state.classPlan.error,
  activePublicClassPlan: state.classPlan.activePublicClassPlan,
  isFetching: state.classPlan.isFetching,
  isLoggedIn: !!state.session.session,
});

const mapDispatchToProps = dispatch => ({
  fetchClassPlan: id => dispatch(fetchClassPlan(id)),
  fetchPublicClassPlan: link => dispatch(fetchPublicClassPlan(link)),
});

const ViewPublicClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewPublicClassPlanPage);

export default ViewPublicClassPlanPageContainer;
