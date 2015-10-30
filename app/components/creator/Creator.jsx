'use strict'
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
      params: {
        trashing: 0,
        random: 1,
        chaining: 1,
        cost_spread: 2,
        set_count: 1,
        mechanic_count: 1,
      },
      loading: false,
      error: false
     };
  },

  buildDeck: function() {
    this.setState({loading: true});
    $.post('/deck', JSON.stringify(this.state.params), function(data) {
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
