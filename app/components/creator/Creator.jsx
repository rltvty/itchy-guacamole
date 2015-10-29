'use strict'
var React = require('react');
var Deck = require('./Deck');

var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    document.title = "Dom Bot | Creator";
  },

  getInitialState: function() {
    return { deck: {} };
  },

  suggestDeck: function() {
    $.post('/deck', "{}", function(data) {
      data = JSON.parse(data);
      data.cards.sort(function(a, b) {
        if(a.cost_treasure > b.cost_treasure){
          return 1;
        } else if (a.cost_treasure < b.cost_treasure) {
          return -1;
        } else {
          return 0;
        }
      })
      this.setState({ deck: data });
    }.bind(this)).fail(function(err) {
      console.error(err);
      this.setState({ deck: {} });
    })
  },

  render: function() {

    return(
      <div>
        <button id='suggest' className='btn btn-primary btn-lg' onClick={this.suggestDeck}>Suggest Deck</button>
        <Deck deck={this.state.deck}/>
      </div>
    );
  }
})
