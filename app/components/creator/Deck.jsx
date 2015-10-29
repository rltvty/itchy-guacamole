'use strict'
var React = require('react')
var Card = require('./Card')

module.exports = React.createClass({
  displayName: 'Deck',

  getCards: function() {
    if(this.props.deck.cards && this.props.deck.cards.length > 0) {
      return this.renderCards();
    }
  },

  renderCards: function() {
    return this.props.deck.cards.map(function(card, index) {
      return (
        <Card key={index}>
          {card}
        </Card>
      );
    });
  },

  render: function() {
    var cards = this.getCards();

    return(
      <div id='deck'>
        {cards}
      </div>
    );
  }
})
