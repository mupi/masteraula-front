import { connect } from 'react-redux'
import QuestionInfo from 'components/question/QuestionInfo'

import { rateQuestion } from 'actions/questionAction.js'


export const QuestionInfoContainer = connect(
    state=> ({
        id:state.question.id,
        question: state.question.activeQuestion,
        rating:state.question.rating
    }),
    dispatch =>
        ({
            onRate(rating) {
                dispatch(rateQuestion(rating))
            }
        })
)(QuestionInfo)
