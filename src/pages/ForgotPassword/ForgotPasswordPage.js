import React from 'react';
import { connect } from 'react-redux'
import { sendForgotPasswordEmail } from 'actions/forgotPasswordAction'
import ForgotPassword from 'components/forgotpassword/ForgotPassword';

import 'bootstrap/dist/css/bootstrap.css';

const ForgotPasswordPage = props => {
  const { success, submit } = props

  return (
    <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
      <ForgotPassword onSubmit={ submit } success = { success } />
    </div>
  )
}

const mapStateToProps = state => ({
  success : state.forgotPassword.success
})


const mapDispatchToProps = dispatch => ({
  submit : values => {
    return dispatch(sendForgotPasswordEmail(values.email))
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage);
