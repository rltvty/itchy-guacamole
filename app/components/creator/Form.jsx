'use strict'
var CheckboxGroup = require('react-checkbox-group');

module.exports = React.createClass({
  displayName: 'Form',

  handleFormChange: function() {
    var selectedSets = this.refs.setsGroup.getCheckedValues();
    var weights = this.getWeightValues();
    this.props.setDeckProperties({selectedSets: selectedSets, weights: weights});
  },

  getWeightValues: function() {
    return {
      trashing: Number(this.refs.trashing.value),
      random: Number(this.refs.random.value),
      chaining: Number(this.refs.chaining.value),
      cost_spread: Number(this.refs.cost_spread.value),
      set_count: Number(this.refs.set_count.value),
      mechanic_count: Number(this.refs.mechanic_count.value),
    }
  },

  getWeightMarkup: function() {
    var weightArray = ["trashing", "random", "chaining", "cost_spread", "set_count", "mechanic_count"]
    return weightArray.map(function(weight, index){
      return (
        <div className="form-group weight-range" key={index}>
          <label for={weight}>{weight.split('_').join(' ')}</label>
          <input className='form-control' id={weight} ref={weight} type='range' min='0' max='10' value={this.props.deckProperties.weights[weight]} onChange={this.handleFormChange} />
        </div>
      )
    }.bind(this));
  },

  getSetMarkup: function() {
    if(this.props.sets) {
      return this.props.sets.map(function(set, index) {
        return (
          <label key={index}>
            <input type="checkbox" value={set}/> {set.split('_').join(' ')}
          </label>
        );
      });
    }
  },

  render: function() {
    var sets = this.getSetMarkup();
    var weights = this.getWeightMarkup();

    return(
      <div id='form'>
        <h3>Selected Sets</h3>
        <CheckboxGroup name="sets" value={this.props.deckProperties.selectedSets} ref="setsGroup" onChange={this.handleFormChange}>
          <div id='labels'>
            {sets}
          </div>
        </CheckboxGroup>

        <h3>Deck Preferences</h3>
        <div id='weights'>
          {weights}
        </div>
      </div>
    );
  }
})
