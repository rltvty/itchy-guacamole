import { combineReducers } from 'redux'
import { DeckReducer } from './deck'

const ErrorReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.error

    default:
      return state
  }
}

const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.loading

    default:
      return state
  }
}

const Reducers = combineReducers({
  deck: DeckReducer,
  error: ErrorReducer,
  loading: LoadingReducer
})

export { Reducers, ErrorReducer, LoadingReducer }
