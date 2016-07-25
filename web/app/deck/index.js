import { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Cards } from './cards'
import { SetSets, SetLoading, SetDeck } from '../utils/actions'
import { fetchSets, fetchDeck, fetchDeckByID } from '../utils/api'

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

const defaultSets = [
  'dominion'
]

const SetsReducer = (state = defaultSets, action) => {
  switch (action.type) {
    case 'SET_SETS':
      return action.sets

    default:
      return state
  }
}

const mapStateToProps = (state, {location}) => ({
  deck: state.deck,
  settings: state.settings,
  id: location.query.id || '',
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  getSets() {
    dispatch(SetLoading(true))

    fetchSets((sets) => {
      dispatch(SetSets(sets))
    })
  },

  getDeck(settings) {
    dispatch(SetLoading(true))

    fetchDeck(settings, (deck) => {
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
  componentDidMount () {
    let { id, getSets, getDeck, getDeckByID, settings } = this.props

    compose(
      id ? getDeckByID(id) : getDeck(settings),
      getSets()
    )
  }

  render () {
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

export { DeckContainer, Deck, DeckReducer, SetsReducer }
