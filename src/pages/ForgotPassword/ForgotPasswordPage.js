import React from 'react';
import { connect } from 'react-redux';
import { sendForgotPasswordEmail } from 'actions/forgotPasswordAction';
import ForgotPassword from 'components/forgotpassword/ForgotPassword';


const ForgotPasswordPage = (props) => {
  const { success, submit } = props;

  return (
    <div className="l-site-masteraula__public-home">
      <div className="l-user-operations middle-box text-center loginscreen  animated fadeInDown">
        <ForgotPassword onSubmit={submit} success={success} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  success: state.forgotPassword.success,
});


const mapDispatchToProps = dispatch => ({
  submit: values => dispatch(sendForgotPasswordEmail(values.email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordPage);
