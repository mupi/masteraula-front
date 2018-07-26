import React from 'react';
import { connect } from 'react-redux';
import UserProfile from 'components/userprofile/UserProfile.js';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile.js';

import { SubmissionError } from 'redux-form';

import { profileEdit, redefineUserPassword } from 'actions/profileEditAction.js';
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


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  submit_profile: (values) => {
    const profile = {
      name: values.name,
      about: values.about,
    };
    return dispatch(profileEdit(profile));
  },

  submit_profile_password: (values) => {
    const profile = { };
    if (values.new_password || values.old_password || values.password_confirmation) {
      const errors = {};
      if (!values.old_password) {
        errors.old_password = 'Informe a senha atual';
      }
      if (!values.new_password) {
        errors.new_password = 'Insira uma senha';
      } else if (values.new_password.length < 8) {
        errors.new_password = 'A senha deve conter no mínimo 8 dígitos';
      } else if (!isNaN(values.new_password)) {
        errors.new_password = 'A senha não deve conter apenas números';
      }

      if (!values.password_confirmation) {
        errors.password_confirmation = 'Insira uma confirmação de senha';
      }
      if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation) {
        errors.password_confirmation = 'Senha e confirmação não coincidem';
      }

      if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);


      profile.new_password1 = values.password_confirmation;
      profile.new_password2 = values.new_password;
      profile.old_password = values.old_password;
    }

    return dispatch(redefineUserPassword(profile));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);
