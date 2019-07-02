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

const mapDispatchToProps = dispatch => ({
  verifyEmail: key => dispatch(verifyEmail(key)),
  resetVerifyEmail: () => dispatch(() => ({ type: REGISTER_SUCCESS })),
  // toggleModal: modal => dispatch(toggleModal(modal)),
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyRegisterPage);
