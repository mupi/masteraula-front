import { connect } from 'react-redux'
import QuestionBasePage from 'pages/Question/QuestionPage'
import { listQuestions } from 'actions/questionAction.js'

  const mapStateToProps = state => ({
        questionPage: state.question.questionPage
  })

  const mapDispatchToProps = dispatch => ({
      listQuestions : page => {
        return dispatch(listQuestions(page))
      }
  })

  export const QuestionBasePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionBasePage);
