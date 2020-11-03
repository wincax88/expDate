import { combineReducers } from 'redux'
import app from './app'

const appReducer = combineReducers({
  app,
})

export default (state, action) => {
  return appReducer(state, action)
}
