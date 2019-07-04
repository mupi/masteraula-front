import { connect } from 'react-redux';
import {
  getStatesList, connectFacebook, connectGoogle,
  disconnectFacebook, disconnectGoogle,
} from 'actions/profileEditAction';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';

const mapStateToProps = state => ({
  stateList: state.profileEdit.stateList,
  isFetchingStatesList: state.profileEdit.isFetchingStatesList,
  socialAccounts: state.session.socialAccounts,
});

const mapDispatchToProps = dispatch => ({
  getStatesList: param => dispatch(getStatesList(param)),
  responseFacebook: response => dispatch(connectFacebook(response)),
  responseGoogle: response => dispatch(connectGoogle(response)),
  disconnectFacebook: response => dispatch(disconnectFacebook(response)),
  disconnectGoogle: response => dispatch(disconnectGoogle(response)),
});


const UserProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);

export default UserProfilePageContainer;
