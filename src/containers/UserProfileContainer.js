import { connect } from 'react-redux'
import UserProfile from 'componentes/userprofile/UserProfile'


const mapStateToProps = state => {
  const { user } = state.session.session
  return ({
    initialValues : {
      name : user.name
    },
    user
  })
}

export default connect(
  mapStateToProps
)
(reduxForm({
  form: 'profile'
})(UserProfile))


export default UserProfileContainer
