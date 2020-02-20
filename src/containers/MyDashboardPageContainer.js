import { connect } from 'react-redux';
import MyDashboardPage from 'pages/MyDashboard/MyDashboardPage';
import {
  fetchMyDashboard,
} from 'actions/dashboardAction';


const mapStateToProps = state => ({
  isFetchingMyDashboard: state.dashboard.isFetchingMyDashboard,
  myDashboard: state.dashboard.myDashboard,
  user: state.session.session.user,
});

const mapDispatchToProps = dispatch => ({
  fetchMyDashboard: () => dispatch(fetchMyDashboard()),
});

const MyDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDashboardPage);

export default MyDashboardPageContainer;
