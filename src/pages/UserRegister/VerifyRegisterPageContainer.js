import { connect } from 'react-redux';
import { toggleModal } from 'actions/loginAction';

import { REGISTER_SUCCESS, verifyEmail } from 'actions/registerAction';
import VerifyRegisterPage from './VerifyRegisterPage';

const mapStateToProps = state => ({
  success: state.register.verifySuccess,
  error: state.register.error,
  modal: state.login.modal,
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: key => dispatch(verifyEmail(key)),
  resetVerifyEmail: () => dispatch(() => ({ type: REGISTER_SUCCESS })),
  toggleModal: modal => dispatch(toggleModal(modal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyRegisterPage);
