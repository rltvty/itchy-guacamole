import { connect } from 'react-redux'
import { SetLoading, SetDeck } from './actions'

const mapDispatchToProps = (dispatch) => ({
  newDeck() {
    getDeck(dispatch)
  }
})

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

const Nav = ({newDeck}) => (
  <div id='nav'>
    <div id='nav-inner'>
      <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
      <h1>Dom Bot</h1>
      <div id='deck-buttons'>
        <button id='deck-new' title='New Deck' className='btn btn-primary' onClick={newDeck}>New Deck</button>
      </div>
    </div>
  </div>
)

const NavContainer = connect(null, mapDispatchToProps)(Nav)

export { NavContainer }
