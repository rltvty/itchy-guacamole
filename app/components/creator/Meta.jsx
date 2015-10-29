'use strict'
var React = require('react');

module.exports = React.createClass({
  displayName: 'Meta',

  getExpansionNames: function() {
    var result = [];
    $.each(this.props.deck.cards, function(i, e) {
      if ($.inArray(e.expansion, result) == -1){
        result.push(e.expansion);
      }
    });
    return result.sort();
  },

  getHardwareNames: function() {
    var result = [];
    for (var key in this.props.deck.hardware) {
      if(this.props.deck.hardware[key]) {
        result.push(key.split("_").join(" "));
      }
    }
    return result.sort();
  },

  getResourceNames: function() {
    var result = [];
    if(this.props.deck.potions) { result.push("Potions"); }
    if(this.props.deck.ruins) { result.push("Ruins"); }
    if(this.props.deck.shelters) { result.push("Shelters"); }
    if(this.props.deck.spoils) { result.push("Spoils"); }
    if(this.props.deck.colonies_and_platinums) { result.push("Colonies/Platinums"); }

    return result.sort();
  },

  render: function() {

    var expansions = this.getExpansionNames().map(function(expansion, index) {
      return (
        <li key={index}>
          {expansion}
        </li>
      );
    });

    var hardware = this.getHardwareNames().map(function(hardware, index) {
      return (
        <li key={index}>
          {hardware}
        </li>
      );
    });

    var resources = this.getResourceNames().map(function(resource, index) {
      return (
        <li key={index}>
          {resource}
        </li>
      );
    });

    return(
      <div id='meta'>

        <div id='expansions'>
          <h3>Sets</h3>
          <ul>
            {expansions}
          </ul>
        </div>

        <div id='resources'>
          <h3>Resources</h3>
          <ul>
            {resources}
          </ul>
        </div>

        <div id='hardware'>
          <h3>Hardware</h3>
          <ul>
            {hardware}
          </ul>
        </div>

      </div>
    );
  }
})
