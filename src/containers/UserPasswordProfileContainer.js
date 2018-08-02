import { connect } from 'react-redux'
import { reduxForm } from 'redux-form';
import UserPasswordProfile from 'components/userprofile/UserPasswordProfile.js'

const validate = values => {
  const errors = {}

  if (values.new_password) {
    if (values.new_password.length < 8){
      errors.new_password = 'A nova senha deve conter no mínimo 8 caracteres'
    } else if (!isNaN(values.new_password)){
      errors.new_password = 'A nova senha não deve conter apenas números'
    }
  }

  if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation){
    errors.password_confirmation = 'Senha e confirmação não coincidem'
  }

  return errors
}


const mapStateToProps = state => {
  const { user } = state.session.session
  return ({
    user
  })
}

const UserPasswordProfileContainer = connect(
  mapStateToProps
)
(reduxForm({
  form: 'profile_password',
  validate
})(UserPasswordProfile))


export default UserPasswordProfileContainer;
