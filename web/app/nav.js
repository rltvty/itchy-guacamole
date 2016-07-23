import { connect } from 'react-redux'
import { NewDeck } from './actions'

const mapDispatchToProps = (dispatch) => ({
  newDeck() {
    dispatch(NewDeck)
  }
})

const Nav = () => (
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
