import { questionService } from 'services';
import { SubmissionError } from 'redux-form'

import { history } from 'helpers/history';
import { updateSession, deleteSession } from 'actions/sessionAction'

export const RATE_QUESTION = 'RATE_QUESTION'


export const rateQuestion = (id, rating) =>
    ({
        type: RATE_QUESTION,
        id,
        rating
    })
