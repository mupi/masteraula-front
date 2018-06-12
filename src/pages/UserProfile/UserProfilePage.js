import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import UserProfile from "./userprofile/UserProfile.js";

import '../css/UserProfile.css';

const UserProfilePage = () =>

            <div className="main-contenedor middle-box loginscreen  animated fadeInDown">
                <div className="contenedor-profile">
                    <h3 className="text-center">Meu Profile</h3>
                    <h5 className="text-center">Permite que a comunidade do MasterAula te conheça</h5>
                    <UserProfile />
                </div>
            </div>


export default UserProfilePage;
