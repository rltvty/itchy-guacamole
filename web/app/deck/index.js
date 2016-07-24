import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Cards } from './cards'
import { SetLoading, SetDeck } from '../actions'
import { fetchDeck, fetchDeckByID } from '../api'

const defaultDeck = {
  cards: [],
  hardware: {}
}

const defaultDeckProperties = {
  selectedSets: ['dominion'],
  weights: {
    trashing: 5,
    random: 5,
    chaining: 5,
    cost_spread: 5,
    set_count: 5,
    mechanic_count: 5,
  }
}

const DeckReducer = (state = defaultDeck, action) => {
  switch (action.type) {
    case 'SET_DECK':
      return action.deck

    default:
      return state
  }
}

const DeckPropertiesReducer = (state = defaultDeckProperties, action) => {
  switch (action.type) {
    case 'SET_DECK_PROPERTIES':
      return action.deckProperties

    default:
      return state
  }
}

const mapStateToProps = (state, {location}) => ({
  deck: state.deck,
  deckProperties: state.deckProperties,
  id: location.query.id || '',
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  getDeck(deckProperties) {
    dispatch(SetLoading(true))

    fetchDeck(deckProperties, (deck) => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
  },

  getDeckByID(id) {
    dispatch(SetLoading(true))

    fetchDeckByID(id, (deck) => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
  }
})

class Deck extends Component {
  componentDidMount() {
    let { id, getDeck, getDeckByID, deckProperties } = this.props
    id ? getDeckByID(id) : getDeck(deckProperties)
  }

  render() {
    let { deck, error, loading } = this.props

    if (error) {
      return (
        <div id='error'>
          <h2 className="text-danger text-center">An error occured! Try again!</h2>
        </div>
      )
    }

    if (loading) {
      return (
        <div id='loading'>
          <img src='/static/images/shield.png' className='fa fa-spin'></img>
        </div>
      )
    }

    return <Cards deck={deck} />
  }
}

const DeckContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Deck))

export { DeckContainer, Deck, DeckReducer, DeckPropertiesReducer }
