import { connect } from 'react-redux';
import {
  getStatesList, connectFacebook, connectGoogle,
  fetchDisconnectSocial,
} from 'actions/profileEditAction';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';

const mapStateToProps = state => ({
  stateList: state.profileEdit.stateList,
  isFetchingStatesList: state.profileEdit.isFetchingStatesList,
  socialAccounts: state.session.session.user.soccialaccounts,
  user: state.session.session.user,
});

const mapDispatchToProps = dispatch => ({
  getStatesList: param => dispatch(getStatesList(param)),
  responseFacebook: response => dispatch(connectFacebook(response)),
  responseGoogle: response => dispatch(connectGoogle(response)),
  disconnectSocialAccount: idSocialAccount => dispatch(fetchDisconnectSocial(idSocialAccount)),
});


const UserProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);

export default UserProfilePageContainer;
