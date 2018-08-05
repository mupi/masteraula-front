import { connect } from 'react-redux';
import ForgotPasswordPage from 'pages/ForgotPassword/ForgotPasswordPage';
import { sendForgotPasswordEmail } from 'actions/forgotPasswordAction';


const mapStateToProps = state => ({
  success: state.forgotPassword.success,
});


const mapDispatchToProps = dispatch => ({
  submit: values => dispatch(sendForgotPasswordEmail(values.email)),
});

const ForgotPasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordPage);

export default ForgotPasswordPageContainer;
