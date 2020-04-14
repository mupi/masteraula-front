import { connect } from 'react-redux';
import ManageOnlineTestsPage from 'pages/OnlineTest/ManageOnlineTestsPage';

const mapStateToProps = () => ({

});


const mapDispatchToProps = () => ({
}
);

const ManageOnlineTestsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageOnlineTestsPage);

export default ManageOnlineTestsPageContainer;
