import { connect } from 'react-redux'
import VerifyRegisterPage from './VerifyRegisterPage'
import {  toggleModal } from 'actions/loginAction';

import { REGISTER_SUCCESS, verifyEmail} from 'actions/registerAction.js'

const mapStateToProps = state => ({
    success : state.register.success,
    error : state.register.error,
      modal : state.login.modal
  })

  const mapDispatchToProps = dispatch => ({
    verifyEmail : key => {
      return dispatch(verifyEmail(key))
    },
    resetVerifyEmail : () => {
      return dispatch(() => {
        return { type: REGISTER_SUCCESS }
      })
    },
    toggleModal : modal =>  dispatch(toggleModal(modal))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VerifyRegisterPage);
