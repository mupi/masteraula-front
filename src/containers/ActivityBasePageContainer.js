import { connect } from 'react-redux';
import ActivityBasePage from 'pages/Activity/ActivityBasePage';
import { listActivities } from 'actions/activityAction';

const mapStateToProps = state => ({
  isFetching: state.activity.isFetching,
  resultsPage: state.activity.activityPage,
  filter: state.filterActivity,
  currentPage: state.activity.currentPage,
});

const mapDispatchToProps = dispatch => ({
  listResults: (page, filter) => dispatch(listActivities(page, filter)),
});

const ActivityBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityBasePage);


export default ActivityBasePageContainer;
