import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import {
  profileEdit, redefineUserPassword, getStatesList, getCitiesList,
} from 'actions/profileEditAction';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';

const mapStateToProps = state => ({
  stateList: state.profileEdit.stateList,
  isFetchingStatesList: state.profileEdit.isFetchingStatesList,
  cityList: state.profileEdit.cityList,
});

const mapDispatchToProps = dispatch => ({
  getStatesList: param => dispatch(getStatesList(param)),
  getCitiesList: (idState, autoLoad) => dispatch(getCitiesList(idState, autoLoad)),

  submit_profile: (values) => {
    const profile = {
      name: values.name,
      about: values.about,
      city: values.userCity !== '0' ? values.userCity : null,
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

const UserProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);

export default UserProfilePageContainer;
