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
        <div className='nav'>
          <div id='logo'></div>
          <ul id='nav'>
            <li><Link to="/">Creator</Link></li>
            <li><Link to="/history">History</Link></li>
          </ul>
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
