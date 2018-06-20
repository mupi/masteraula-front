import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeUserPage from "../HomeUser/HomeUserPage"
import UserProfile from "components/userprofile/UserProfile.js";

import 'assets/css/UserProfile.css';

const UserProfilePage = () =>
          <HomeUserPage>
                <div className="contenedor-profile">
                    <h3 className="text-center">Meu Profile</h3>
                    <h5 className="text-center">Permite que a comunidade do MasterAula te conheça</h5>
                    <UserProfile />
                </div>
          </HomeUserPage>

export default UserProfilePage;
