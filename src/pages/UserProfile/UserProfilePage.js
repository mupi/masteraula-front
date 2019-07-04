import React from 'react';
import {
  Alert, Row, Col, Container,
} from 'reactstrap';
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
      stateList, isFetchingStatesList, responseFacebook, responseGoogle, socialAccounts,
      disconnectFacebook, disconnectGoogle,
    } = this.props;

    const socialAccountFacebook = (socialAccounts ? socialAccounts.filter(item => item.provider.toString().trim() === 'facebook') : null);
    const socialAccountGoogle = (socialAccounts ? socialAccounts.filter(item => item.provider.toString().trim() === 'google') : null);

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
          <Container>
            <Row className="sub-section-user-title">
              <h5>
              Vincular contas
              </h5>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col className="text-center">
                {socialAccountFacebook
                  ? (
                    <FacebookLogin
                      appId={facebookLoginId}
                      fields="name,email,picture"
                      callback={disconnectFacebook}
                      icon="fa-facebook"
                      size="small"
                      textButton="Desvincular do Facebook"
                    />
                  )
                  : (
                    <FacebookLogin
                      appId={facebookLoginId}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      icon="fa-facebook"
                      size="small"
                      textButton="Vincular com Facebook"
                    />
                  )}
                {socialAccountGoogle
                  ? (
                    <GoogleLogin
                      clientId={googleLoginId}
                      buttonText="Vincular com Google"
                      onSuccess={disconnectGoogle}
                      cookiePolicy="single_host_origin"
                      className="google-login"
                    />
                  )
                  : (
                    <GoogleLogin
                      clientId={googleLoginId}
                      buttonText="Vincular com Google"
                      onSuccess={responseGoogle}
                      cookiePolicy="single_host_origin"
                      className="google-login"
                    />
                  )}
              </Col>
            </Row>
          </Container>
        </div>
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
