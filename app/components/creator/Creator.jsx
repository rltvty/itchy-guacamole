'use strict'
var Form = require('./Form');
var Deck = require('./Deck');
var Loading = require('../Loading');
var Error = require('../Error');

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    this.buildDeck();
  },

  getInitialState: function() {
    return {
      deck: { cards: [] },
      loading: false,
      error: false
     };
  },

  getParams: function() {
    return { sets: this.refs.form.state.selectedSets };
  },

  buildDeck: function() {
    this.setState({loading: true});
    var selectedSets = JSON.stringify(this.getParams());
    $.post('/deck', selectedSets, function(data) {
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
        <Form ref="form"/>
        { this.state.loading ? <Loading /> :<Deck deck={this.state.deck} />}
        { this.state.error ? <Error /> : null }
      </div>
    );
  }
})
