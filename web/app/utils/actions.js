export const SetLoading = (loading) => ({
  type: 'SET_LOADING',
  loading: loading
})

export const SetError = (error) => ({
  type: 'SET_ERROR',
  error: error
})

export const SetModalState = (visible) => ({
  type: 'SET_MODAL_STATE',
  visible: visible
})

export const SetSets = (sets) => ({
  type: 'SET_SETS',
  sets: sets
})

export const NewDeck = () => ({
  type: 'NEW_DECK'
})

export const SetDeck = (deck) => ({
  type: 'SET_DECK',
  deck: deck
})

export const SetSettings = (settings) => ({
  type: 'SET_SETTINGS',
  settings: settings
})
