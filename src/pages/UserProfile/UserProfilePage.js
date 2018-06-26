import React from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import HomeUserPage from "../HomeUser/HomeUserPage"
import UserProfile from "components/userprofile/UserProfile.js";

import { profileEdit } from "actions/profileEditAction.js"

import 'assets/css/UserProfile.css';

const UserProfilePage = props =>{
    const { submit } = props
    return(
        <HomeUserPage>
            <div className="contenedor-profile">
                <h3 className="text-center">Meu Profile</h3>
                <h5 className="text-center">Permite que a comunidade do MasterAula te conheça</h5>
                <UserProfile onSubmit={ submit }/>
            </div>
        </HomeUserPage>
    )
}

const mapDispatchToProps = dispatch => ({
    submit : values => {
        const profile = {
            name: values.name
        }
        dispatch(profileEdit(profile))
    }
})

export default connect(
    () => {},
    mapDispatchToProps
)
(UserProfilePage);
