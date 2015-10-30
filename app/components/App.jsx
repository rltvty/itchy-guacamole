'use strict'
var Creator = require('./creator/Creator');
var styles = require('../styles/base.scss');

var App = React.createClass({

  hanldeBuildClick: function() {
    this.refs.creator.buildDeck();
  },

  render: function() {
    return (
      <div>
        <div id='nav'>
          <div id='nav-inner'>
            <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
            <h1>Dom Bot</h1>
            <button id='build-deck' className='btn btn-lg btn-primary' onClick={this.hanldeBuildClick}>Build Deck</button>
          </div>
        </div>
        <Creator ref='creator'/>
      </div>
    );
  }
});

ReactDOM.render((<App />), document.getElementById('content'));
