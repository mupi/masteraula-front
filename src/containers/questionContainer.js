import { connect } from 'react-redux'
import QuestionPage from 'pages/Question/QuestionPage'
import { fetchQuestion, rateQuestion } from 'actions/questionAction.js'

  const mapStateToProps = state => ({
        id:state.question.id,
        activeQuestion: state.question.activeQuestion,
        rating:state.question.rating
  })

  const mapDispatchToProps = dispatch => ({
      onRate : rating => {
        return dispatch(rateQuestion(rating))
      }
  })

  export const QuestionPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionPage);
