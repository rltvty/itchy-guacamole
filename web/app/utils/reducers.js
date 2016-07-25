import { combineReducers } from 'redux'

import { DeckReducer, SetsReducer } from '../deck'
import { ModalReducer } from '../modals'
import { SettingsReducer } from '../modals/settings'

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
  loading: LoadingReducer,
  modal: ModalReducer,
  sets: SetsReducer,
  settings: SettingsReducer
})

export { Reducers, ErrorReducer, LoadingReducer }
