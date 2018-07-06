import React from 'react';
import { connect } from 'react-redux'
import { resetForgotPassword } from 'actions/forgotPasswordAction'
import RedefinePassword from 'components/forgotpassword/RedefinePassword';

import 'bootstrap/dist/css/bootstrap.css';

const RedefinePasswordPage = props =>{
  const { submit, match, success } = props
  const uid = match.params.uid
  const token = match.params.token

  return (
    <div className="public-home">
    <div className="main-contenedor middle-box text-center loginscreen  animated fadeInDown">
      <RedefinePassword onSubmit={ submit } uid={ uid } token={ token } success={ success }/>
    </div>
    </div>
  )
}

const mapStateToProps = state => ({
  success : state.forgotPassword.success
})

const mapDispatchToProps = dispatch => ({
  submit : (values, d, props) => {
    return dispatch(resetForgotPassword(values.newpassword, values.repeatpassword, props.uid, props.token))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedefinePasswordPage);
