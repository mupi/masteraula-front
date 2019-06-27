import { connect } from 'react-redux';
import { getStatesList, connectFacebook, connectGoogle } from 'actions/profileEditAction';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';

const mapStateToProps = state => ({
  stateList: state.profileEdit.stateList,
  isFetchingStatesList: state.profileEdit.isFetchingStatesList,
});

const mapDispatchToProps = dispatch => ({
  getStatesList: param => dispatch(getStatesList(param)),
  responseFacebook: response => dispatch(connectFacebook(response)),
  responseGoogle: response => dispatch(connectGoogle(response)),
});


const UserProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);

export default UserProfilePageContainer;
