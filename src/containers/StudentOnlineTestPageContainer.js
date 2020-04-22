import { connect } from 'react-redux';
import StudentOnlineTestPage from 'pages/OnlineTest/StudentOnlineTestPage';
import { verifyOnlineTest, fetchStudentOnlineTest } from 'actions/onlineTestAction';

const mapStateToProps = state => ({
  basicOnlineTest: state.onlineTest.basicStudentOnlineTest,
  isFetchingBasicStudentOnlineTest: state.onlineTest.isFetchingBasicStudentOnlineTest,
  fullOnlineTest: state.onlineTest.fullStudentOnlineTest,
  isFetchingFullStudentOnlineTest: state.onlineTest.isFetchingFullStudentOnlineTest,
  isLoggedIn: !!state.session.session,
});


const mapDispatchToProps = dispatch => ({
  verifyOnlineTest: id => dispatch(verifyOnlineTest(id)),
  fetchStudentOnlineTest: id => dispatch(fetchStudentOnlineTest(id)),
});

const StudentOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentOnlineTestPage);

export default StudentOnlineTestPageContainer;
