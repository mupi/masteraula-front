import { connect } from 'react-redux';
import ResultsOnlineTestPage from 'pages/OnlineTest/ResultsOnlineTestPage';
import { fetchOnlineTest } from 'actions/onlineTestAction';

const mapStateToProps = state => ({
  activeOnlineTest: state.onlineTest.activeOnlineTest,
  isFetchingOnlineTest: state.onlineTest.isFetchingBaseDocument,
  userId: state.session.session.user.id,
  user: state.session.session.user,
});


const mapDispatchToProps = dispatch => ({
  fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
});

const ResultsOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultsOnlineTestPage);

export default ResultsOnlineTestPageContainer;
