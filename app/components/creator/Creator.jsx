'use strict'
var React = require('react')
var Deck = require('./Deck')

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    document.title = "Dom Bot | Creator";
  },

  getInitialState: function() {
    return {deck: []}
  },

  suggestDeck: function() {
    this.setState({
      deck: [{name: "King's Court"}, {name: "Feast"}]
    })
  },

  render: function() {
    return(
      <div>
        <h1>
          Deck Creator
          <button onClick={this.suggestDeck}>Suggest Deck</button>
        </h1>
        <Deck deck={this.state.deck}/>
      </div>
    );
  }
})
