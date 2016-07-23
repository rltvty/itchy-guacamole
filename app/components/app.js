'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

/* Components to link to */
import Creator from './creator'

/* Styles */
import styles from '../styles/base.scss'

const App = () => (
  <div>
    <div id='nav'>
      <div id='nav-inner'>
        <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
        <h1>Dom Bot</h1>
        <div id='deck-buttons'>
          <button id='deck-settings' title='Settings' className='btn btn-info' onClick={settings}>Settings</button>
          <button id='deck-new' title='New Deck' className='btn btn-primary' onClick={newDeck}>New Deck</button>
        </div>
      </div>
    </div>
    <Creator />
  </div>
)

ReactDOM.render((<App />), document.getElementById('content'));
