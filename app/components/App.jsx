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
var Creator = require('./creator/Creator');

/* Styles */
var styles = require('../styles/base.scss');

// Visual Nav
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
