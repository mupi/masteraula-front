import { connect } from 'react-redux';
import MyDashboardPage from 'pages/MyDashboard/MyDashboardPage';

const mapStateToProps = () => ({
});


const mapDispatchToProps = () => {
};

const MyDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDashboardPage);

export default MyDashboardPageContainer;
