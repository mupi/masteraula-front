import React from 'react';
import UserProfile from 'components/userprofile/UserProfile';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile';
import HomeUserPage from '../HomeUser/HomeUserPage';

class UserProfilePage extends React.Component {
  componentDidMount() {
    const { getStatesList } = this.props;
    getStatesList();
  }

  render() {
    const { submit_profile, submit_profile_password, stateList } = this.props;

    return (
      <HomeUserPage>
        <div className="l-user-profile">
          <h3 className="text-center">
              Meu Perfil
          </h3>
          <h5 className="text-center">
              Permite que a comunidade do MasterAula te conheça
          </h5>
          <UserProfile onSubmit={submit_profile} stateList={stateList} />
          <UserPasswordProfile onSubmit={submit_profile_password} />
        </div>
      </HomeUserPage>
    );
  }
}


export default UserProfilePage;
