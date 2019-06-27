import React from 'react';
import { Alert } from 'reactstrap';
import UserProfileContainer from 'containers/UserProfileContainer';
import UserPasswordProfileContainer from 'containers/UserPasswordProfileContainer';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { facebookLoginId, googleLoginId } from 'helpers/config';
import HomeUserPage from '../HomeUser/HomeUserPage';

class UserProfilePage extends React.Component {
  componentDidMount() {
    const { getStatesList } = this.props;
    getStatesList();
  }

  render() {
    const {
      stateList, isFetchingStatesList, responseFacebook, responseGoogle,
    } = this.props;

    if (isFetchingStatesList) {
      return (
        <HomeUserPage>
          <Alert className="alert--warning" color="warning">
            Carregando ...
          </Alert>
        </HomeUserPage>
      );
    }

    return (
      <HomeUserPage>
        <div className="l-user-profile">
          <h3 className="text-center">
            Meu Perfil
          </h3>
          <h5 className="text-center">
            Conte um pouco sobre você
          </h5>
          <UserProfileContainer stateList={stateList} />
          <UserPasswordProfileContainer />
        </div>
        <FacebookLogin
          appId={facebookLoginId}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          size="small"
        />
        <GoogleLogin
          clientId={googleLoginId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
