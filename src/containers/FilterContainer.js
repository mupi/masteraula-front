import { connect } from 'react-redux'
import QuestionPage from 'pages/Question/QuestionPage'
import { fetchQuestion, rateQuestion } from 'actions/questionAction.js'

  const mapStateToProps = state => ({
        isFetching: state.question.isFetching,
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

  const QuestionPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionPage);

  export default FilterContainer
