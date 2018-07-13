import { connect } from 'react-redux'
import QuestionPage from 'pages/Question/QuestionPage'
import { fetchQuestion, rateQuestion } from 'actions/questionAction.js'

  const mapStateToProps = state => ({
        activeQuestion: state.question.activeQuestion,
        rating:state.question.rating
  })

  const mapDispatchToProps = dispatch => ({
      fetchQuestion : id => {
        return dispatch(fetchQuestion(id))
      },
      onRate : rating => {
        return dispatch(rateQuestion(rating))
      }
  })

  export const QuestionPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionPage);
