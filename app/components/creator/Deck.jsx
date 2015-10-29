'use strict'
var React = require('react')
var Card = require('./Card')

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

  getExpansionNames: function() {
    var result = [];
    $.each(this.props.deck.cards, function(i, e) {
        if ($.inArray(e.expansion, result) == -1) result.push(e.expansion);
    });

    return result.sort().join(" ");
  },

  render: function() {
    var cards = this.getCards();
    var expansions = this.getExpansionNames();

    return(
      <div id='deck'>
        <p>{expansions}</p>
        {cards}
      </div>
    );
  }
})
