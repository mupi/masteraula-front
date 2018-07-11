import { connect } from 'react-redux'
import QuestionInfo from 'components/question/QuestionInfo'

import { rateQuestion } from 'actions/questionAction.js'


export const QuestionInfoContainer = connect(
    state=> ({
        id:state.question.id,
        activeQuestion: state.question.activeQuestion,
        rating:state.question.rating
    }),
    dispatch =>
        ({
            onRate(rating) {
                dispatch(rateQuestion(rating))
            }
        })
)(QuestionInfo)
/*

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
  )(QuestionInfo);*/
