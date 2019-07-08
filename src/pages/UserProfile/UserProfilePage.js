import React from 'react';
import {
  Alert, Row, Col, Container, Button,
} from 'reactstrap';
import UserProfileContainer from 'containers/UserProfileContainer';
import UserPasswordProfileContainer from 'containers/UserPasswordProfileContainer';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { facebookLoginId, googleLoginId } from 'helpers/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeUserPage from '../HomeUser/HomeUserPage';

class UserProfilePage extends React.Component {
  componentDidMount() {
    const { getStatesList } = this.props;
    getStatesList();
  }

  render() {
    const {
      stateList, isFetchingStatesList, responseFacebook, responseGoogle, socialAccounts,
      disconnectSocialAccount,
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
          {socialAccounts && socialAccounts.length === 0
            ? <UserPasswordProfileContainer />
            : (
              <Container>
                <Row className="sub-section-user-title">
                  <h5>
                  Vincular contas
                  </h5>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col className="text-center">
                    {socialAccountFacebook && socialAccountFacebook.length > 0
                      ? (
                        <span>Conta vinculada com Facebook</span>
                      )
                      : ''}
                    {socialAccountGoogle && socialAccountGoogle.length > 0
                      ? (
                        <span>Conta vinculada com Google</span>
                      )
                      : ''}
                  </Col>
                </Row>
              </Container>
            )
          }
          { /* <Container>
            <Row className="sub-section-user-title">
              <h5>
              Vincular contas
              </h5>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col className="text-center">
                {socialAccountFacebook && socialAccountFacebook.length > 0
                  ? (
                    <Button
                      value={socialAccountFacebook[0].id}
                      title="Desvincular do Facebook"
                      onClick={() => disconnectSocialAccount(socialAccountFacebook[0].id)}
                      className="kep-login-facebook small"
                    >
                      <FontAwesomeIcon icon={['fab', 'facebook']} className="btn__icon" />
                      {' '}
                      Desvincular do Facebook
                    </Button>
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
                {socialAccountGoogle && socialAccountGoogle.length > 0
                  ? (
                    <Button
                      value={socialAccountGoogle[0].id}
                      title="Desvincular do Google"
                      onClick={() => disconnectSocialAccount(socialAccountGoogle[0].id)}
                      className="google-login"
                    >
                      <FontAwesomeIcon icon={['fab', 'google']} className="btn__icon" />
                      {' '}
                      Desvincular do Google
                    </Button>
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
                </Container> */}
        </div>
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
