import { connect } from 'react-redux'

import { SetLoading, SetDeck } from './actions'
import { fetchDeck } from './api'

const mapStateToProps = (state) => ({
  deckProperties: state.deckProperties
})

const mapDispatchToProps = (dispatch) => ({
  newDeck(deckProperties) {
    dispatch(SetLoading(true))

    fetchDeck(deckProperties, (deck) => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
  }
})

const Nav = ({newDeck, deckProperties}) => (
  <div id='nav'>
    <div id='nav-inner'>
      <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
      <h1>Dom Bot</h1>
      <div id='deck-buttons'>
        <button id='deck-new' title='New Deck' className='btn btn-primary' onClick={() => newDeck(deckProperties)}>New Deck</button>
      </div>
    </div>
  </div>
)

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)

export { NavContainer }
