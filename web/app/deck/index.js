import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import fetch from 'isomorphic-fetch'

import { Cards } from './cards'
import { SetLoading, SetDeck } from '../actions'

const defaultDeck = {
  cards: [],
  hardware: {}
}

const deckProperties = {
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

const mapStateToProps = (state, {location}) => ({
  deck: state.deck,
  id: location.query.id || '',
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  getDeck() {
    getDeck(dispatch)
  },

  getDeckByID(id) {
    getDeckByID(dispatch, id)
  }
})

const getDeck = (dispatch) => {
  dispatch(SetLoading(true))

  let body = JSON.stringify(deckProperties)
  fetch('deck', {method: 'POST', body: body, headers: { Authorization: 'Basic '+btoa('user:password')}})
    .then(res => res.json())
    .then(deck => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
}

const getDeckByID = (dispatch, id) => {
  dispatch(SetLoading(true))
  fetch(`deck/${id}`, { headers: { Authorization: 'Basic '+btoa('user:password')}})
    .then(res => res.json())
    .then(deck => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
}

class Deck extends Component {
  componentDidMount() {
    let { id, getDeck, getDeckByID } = this.props
    id ? getDeckByID(id) : getDeck()
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

export { DeckContainer, Deck, DeckReducer }
