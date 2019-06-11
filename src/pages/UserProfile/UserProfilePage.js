import React from 'react';
import { Alert } from 'reactstrap';
import UserProfileContainer from 'containers/UserProfileContainer';
import UserPasswordProfileContainer from 'containers/UserPasswordProfileContainer';
import HomeUserPage from '../HomeUser/HomeUserPage';

class UserProfilePage extends React.Component {
  componentDidMount() {
    const { getStatesList } = this.props;
    getStatesList();
  }

  render() {
    const {
      stateList, isFetchingStatesList,
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
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
