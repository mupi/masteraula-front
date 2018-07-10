import { questionService } from 'services';
import { SubmissionError } from 'redux-form'

import { history } from 'helpers/history';
import { updateSession, deleteSession } from 'actions/sessionAction'
import { v4 } from 'uuid'

//Load question
export const QUESTION_FETCH = 'QUESTION_FETCH'
export const QUESTION_FETCH_SUCCESS = 'QUESTION_FETCH'
export const QUESTION_FETCH_FAILURE = 'QUESTION_FETCH'



export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'
export const RATE_QUESTION = 'RATE_QUESTION'

export const addQuestion = (title, color) =>
    ({
        type: ADD_QUESTION,
        id: v4(),
        create_date: new Date().toString()
    })

export const removeQuestion = id =>
        ({
            type: REMOVE_QUESTION,
            id
        })

export const updateQuestion = id =>
        ({
            type: REMOVE_QUESTION,
            id
        })

export const rateQuestion = (rating) =>
    ({
        type: RATE_QUESTION,
        rating
    })
