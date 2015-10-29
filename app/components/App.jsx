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
  render() {
    return (
      <Creator />
    );
  }
});

// Actual routing hierarchy
ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path="/static" component={App}>
      <IndexRoute component={Creator} />
    </Route>
  </Router>
), document.getElementById('content'));
