import { combineReducers } from 'redux'
import { login } from './reducers/loginReducer'

const rootReducer = combineReducers({
    login
})

export default rootReducer