'use strict'
var React = require('react');
var ReactDOM = require('react-dom');

/* Router Components */
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

/* Components to link to */
var Creator = require('./creator');

/* Styles */
var styles = require('../styles/base.scss');

// Visual Nav
var App = React.createClass({

  hanldeNewClick: function() {
    this.refs.creator.getNewDeck();
  },

  hanldeSettingsClick: function() {
    this.refs.creator.showSettings();
  },

  render: function() {
    return (
      <div>
        <div id='nav'>
          <div id='nav-inner'>
            <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
            <h1>Dom Bot</h1>
            <div id='deck-buttons'>
              <button id='deck-settings' title='Settings' className='btn btn-info' onClick={this.hanldeSettingsClick}>Settings</button>
              <button id='deck-new' title='New Deck' className='btn btn-primary' onClick={this.hanldeNewClick}>New Deck</button>
            </div>
          </div>
        </div>
        <Creator ref="creator"/>
      </div>
    );
  }
});

// Actual routing hierarchy
ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Creator} />
    </Route>
  </Router>
), document.getElementById('content'));
