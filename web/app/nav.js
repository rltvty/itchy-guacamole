import { connect } from 'react-redux'

import { SetLoading, SetDeck, SetModalState } from './utils/actions'
import { fetchDeck } from './utils/api'

const mapStateToProps = (state) => ({
  settings: state.settings
})

const mapDispatchToProps = (dispatch) => ({
  newDeck(settings) {
    dispatch(SetLoading(true))

    fetchDeck(settings, (deck) => {
      dispatch(SetDeck(deck))
      dispatch(SetLoading(false))
    })
  },

  showSettings() {
    dispatch(SetModalState(true))
  }
})

const Nav = ({settings, newDeck, showSettings}) => (
  <div id='nav'>
    <div id='nav-inner'>
      <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
      <h1>Dom Bot</h1>
      <div id='deck-buttons'>
        <button id='deck-settings' title='Settings' className='btn btn-info' onClick={showSettings}>Settings</button>
        <button id='deck-new' title='New Deck' className='btn btn-primary' onClick={() => newDeck(settings)}>New Deck</button>
      </div>
    </div>
  </div>
)

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)

export { NavContainer }
