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
var History = require('./history/History');

/* Styles */
var styles = require('../styles/base.scss');

// Visual Nav
var App = React.createClass({
  render() {
    return (
      <div>
        <div id='nav'>
          <div id='nav-inner'>
            <img src='/static/images/shield.png' alt='Dom Bot Shield' title='Dom Bot Shield'></img>
            <h1>Dom Bot</h1>
            <ul id='menu'>
              <li><Link to="/" title='Creator'>Creator</Link></li>
              <li><Link to="/history" title='History'>History</Link></li>
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

// Actual routing hierarchy
ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Creator} />
      <Route path="history" component={History} />
    </Route>
  </Router>
), document.getElementById('content'));
