import React from 'react';
import UserProfile from 'components/userprofile/UserProfile.js';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile.js';
import HomeUserPage from '../HomeUser/HomeUserPage';


const UserProfilePage = (props) => {
  const { submit_profile, submit_profile_password } = props;
  return (
    <HomeUserPage>
      <div className="contenedor-profile">
        <h3 className="text-center">
Meu Profile
        </h3>
        <h5 className="text-center">
Permite que a comunidade do MasterAula te conheça
        </h5>
        <UserProfile onSubmit={submit_profile} />
        <UserPasswordProfile onSubmit={submit_profile_password} />
      </div>
    </HomeUserPage>
  );
};

export default UserProfilePage;