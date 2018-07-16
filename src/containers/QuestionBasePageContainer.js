import { connect } from 'react-redux'
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage'
import { listQuestions } from 'actions/questionAction.js'

  const mapStateToProps = state => ({
        questionPage: state.question.questionPage,
        currentPage: state.question.currentPage
  })

  const mapDispatchToProps = dispatch => ({
      listQuestions : page => {
        return dispatch(listQuestions(page))
      }
  })

  const QuestionBasePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionBasePage);

  export default QuestionBasePageContainer
