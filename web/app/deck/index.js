import { connect } from 'react-redux'
import { Cards } from './cards'

const defaultDeck = {
  cards: [],
  hardware: {}
}

const DeckReducer = (state = defaultDeck, action) => {
  switch (action.type) {
    case 'SET_DECK':
      return action.deck

    default:
      return state
  }
}

const mapStateToProps = (state) => ({
  deck: state.deck,
  error: state.error,
  loading: state.loading,
})

const Error = () => (
  <div id='error'>
    <h2 className="text-danger text-center">An error occured! Try again!</h2>
  </div>
)

const Loading = () => (
  <div id='loading'>
    <img src='/static/images/shield.png' className='fa fa-spin'></img>
  </div>
)

const Deck = ({deck, error, loading}) => {
  if (error) {
    return <Error />
  }

  if (loading) {
    <Loading />
  }

  return <Cards deck={deck} />
}

const DeckContainer = connect(mapStateToProps)(Deck)

export { DeckContainer, Deck, Error, Loading, DeckReducer }
