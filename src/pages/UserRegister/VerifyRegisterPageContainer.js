import { connect } from 'react-redux';
// import { toggleModal } from 'actions/loginAction';
import { showModal, hideModal } from 'actions/modalAction';
import { REGISTER_SUCCESS, verifyEmail } from 'actions/registerAction';
import VerifyRegisterPage from './VerifyRegisterPage';

const mapStateToProps = state => ({
  success: state.register.verifySuccess,
  error: state.register.error,
  modal: state.login.modal,
});

const mapDispatchToProps = (dispatch) => {
  const loginModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'login2',
  };
  return {
    verifyEmail: key => dispatch(verifyEmail(key)),
    resetVerifyEmail: () => dispatch(() => ({ type: REGISTER_SUCCESS })),
    // new way to handle modals
    showLoginModal: () => dispatch(showModal(loginModalProps)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyRegisterPage);
