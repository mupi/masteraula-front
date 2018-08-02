import { connect } from 'react-redux';
import RedefinePasswordPage from 'pages/RedefinePassword/RedefinePasswordPage';
import { resetForgotPassword } from 'actions/forgotPasswordAction';

const mapStateToProps = state => ({
  success: state.forgotPassword.success,
});

const mapDispatchToProps = dispatch => ({
  submit: (values, d, props) => dispatch(resetForgotPassword(values.newpassword, values.repeatpassword, props.uid, props.token)),
});

const RedefinePasswordPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedefinePasswordPage);

export default RedefinePasswordPageContainer;