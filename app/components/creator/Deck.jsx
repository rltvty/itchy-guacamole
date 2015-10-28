'use strict'
var React = require('react')
var Card = require('./Card')

module.exports = React.createClass({
  displayName: 'Deck',

  getCards: function() {
    if(this.props.deck.length > 0) {
      return this.renderCards();
    } else {
      return this.noCards();
    }
  },

  renderCards: function() {
    return this.props.deck.map(function(card, index) {
      return (
        <Card key={index}>
          {card}
        </Card>
      );
    });
  },

  noCards: function() {
    return (
      <p>Hit the suggest button to get a deck</p>
    );
  },

  render: function() {
    var cards = this.getCards();

    return(
      <div>
        {cards}
      </div>
    );
  }
})
