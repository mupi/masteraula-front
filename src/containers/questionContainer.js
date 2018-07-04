import { connect } from 'react-redux'
import QuestionInfo from 'components/question/QuestionInfo'

import { rateQuestion } from 'actions/questionAction.js'


export const QuestionInfoContainer = connect(
    null,
    dispatch =>
        ({
            onRate(rating) {
                dispatch(rateQuestion(rating))
            }
        })
)(QuestionInfo)
