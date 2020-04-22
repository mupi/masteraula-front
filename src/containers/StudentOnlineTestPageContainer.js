import { connect } from 'react-redux';
import StudentOnlineTestPage from 'pages/OnlineTest/StudentOnlineTestPage';
import { fetchOnlineTest } from 'actions/onlineTestAction';

const mapStateToProps = state => ({
  activeOnlineTest: state.onlineTest.activeOnlineTest,
  isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
  isLoggedIn: !!state.session.session,
});


const mapDispatchToProps = dispatch => ({
  fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
});

const StudentOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentOnlineTestPage);

export default StudentOnlineTestPageContainer;
