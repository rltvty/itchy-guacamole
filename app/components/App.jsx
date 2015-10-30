'use strict'
var ReactDOM = require('react-dom');
var Creator = require('./creator/Creator');
var styles = require('../styles/base.scss');

// Visual Nav
var App = React.createClass({

  testy: function() {
    console.log(this.refs)
  },

  render: function() {
    return (
      <div>
        <div id='nav'>
          <div id='nav-inner'>
            <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
            <h1>Dom Bot</h1>
            <button id='build-deck' className='btn btn-lg btn-primary' onClick={this.testy}>Build Deck</button>
          </div>
        </div>
        <Creator />
      </div>
    );
  }
});

// Actual routing hierarchy
ReactDOM.render((
  <App />
), document.getElementById('content'));
