'use strict'
var React = require('react');
var classNames = require('classnames');
var Deck = require('./Deck');
var Loading = require('../Loading');
var Error = require('../Error');

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    $('#build-deck').click(function() {
      this.buildDeck();
    }.bind(this));
    this.buildDeck();
  },

  getInitialState: function() {
    return {
      deck: { cards: [] },
      loading: false,
      error: false
     };
  },

  buildDeck: function() {
    this.setState({loading: true});
    $.post('/deck', "{}", function(data) {
      data = JSON.parse(data);
      this.setState({
        deck: data,
        loading: false,
        error: false
      });
    }.bind(this))
    .fail(function(err) {
      console.error(err);
      this.setState({
        deck: { cards: [] },
        loading: false,
        error: true
      });
    }.bind(this));
  },

  render: function() {

    return(
      <div>
        { this.state.loading ? <Loading /> : <Deck deck={this.state.deck}/> }
        { this.state.error ? <Error /> : null }
      </div>
    );
  }
})
