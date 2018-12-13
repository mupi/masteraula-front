import { connect } from 'react-redux';
import { getStatesList } from 'actions/profileEditAction';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';

const mapStateToProps = state => ({
  stateList: state.profileEdit.stateList,
  isFetchingStatesList: state.profileEdit.isFetchingStatesList,
});

const mapDispatchToProps = dispatch => ({
  getStatesList: param => dispatch(getStatesList(param)),
});


const UserProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);

export default UserProfilePageContainer;
