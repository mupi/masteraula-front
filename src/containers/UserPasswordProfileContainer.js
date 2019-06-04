import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile';
import { redefineUserPassword } from 'actions/profileEditAction';

const validate = (values) => {
  const errors = {};

  if (!values.new_password && !values.password_confirmation && !values.old_password) {
    errors.new_password = ' Campo obrigatório';
    errors.password_confirmation = ' Campo obrigatório';
    errors.old_password = ' Campo obrigatório';
  }

  if (values.new_password) {
    if (values.new_password.length < 8) {
      errors.new_password = 'A nova senha deve conter no mínimo 8 caracteres';
    } else if (!isNaN(values.new_password)) {
      errors.new_password = 'A nova senha não deve conter apenas números';
    }
  }

  if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation) {
    errors.password_confirmation = 'Senha e confirmação não coincidem';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state.session.session;
  return ({
    user,
  });
};

const mapDispatchToProps = dispatch => ({

  onSubmit: (values) => {
    const profile = { };
    if (values.new_password || values.old_password || values.password_confirmation) {
      const errors = {};
      if (!values.old_password) {
        errors.old_password = 'Informe a senha atual';
      }
      if (!values.new_password) {
        errors.new_password = 'Insira uma senha';
      } else if (values.new_password.length < 8) {
        errors.new_password = 'A senha deve conter no mínimo 8 caracteres';
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

const UserPasswordProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'profile_password',
  validate,
})(UserPasswordProfile));


export default UserPasswordProfileContainer;
