'use strict'
var React = require('react');
var Card = require('./Card');
var Meta = require('./Meta');

module.exports = React.createClass({
  displayName: 'Deck',

  getCards: function() {
    if(this.props.deck.cards && this.props.deck.cards.length > 0) {
      this.props.deck.cards.sort(this.sortByCost);
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

  sortByCost: function(a, b) {
    if(a.cost_treasure > b.cost_treasure){
      return 1;
    } else if (a.cost_treasure < b.cost_treasure) {
      return -1;
    } else {
      return 0;
    }
  },

  render: function() {
    var cards = this.getCards();
    
    return(
      <div id='deck'>
        <Meta deck={this.props.deck}/>
        <div id='cards'>
          {cards}
        </div>
      </div>
    );
  }
})
