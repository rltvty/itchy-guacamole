export const SetLoading = (loading) => ({
  type: 'SET_LOADING',
  loading: loading
})

export const SetError = (error) => ({
  type: 'SET_ERROR',
  error: error
})

export const SetDeck = (deck) => ({
  type: 'SET_DECK',
  deck: deck
})

export const SetDeckProperties = (deckProperties) => ({
  type: 'SET_DECK_PROPERTIES',
  deckProperties: deckProperties
})

export const NewDeck = () => ({
  type: 'NEW_DECK'
})
