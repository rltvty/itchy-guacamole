'use strict'
var CheckboxGroup = require('react-checkbox-group');

module.exports = React.createClass({
  displayName: 'Form',

  handleSetChange: function() {
    var selectedSets = this.refs.setsGroup.getCheckedValues();
    this.props.setDeckProperties({selectedSets: selectedSets});
  },

  getSets: function() {
    if(this.props.sets) {
      return this.props.sets.map(function(set, index) {
        return (
          <label>
            <input type="checkbox" value={set}/> {set.split('_').join(' ')}
          </label>
        );
      });
    }
  },

  render: function() {
    var sets = this.getSets();

    return(
      <div id='form'>
        <CheckboxGroup name="sets" value={this.props.deckProperties.selectedSets} ref="setsGroup" onChange={this.handleSetChange}>
          <div id='labels'>
            {sets}
          </div>
        </CheckboxGroup>
      </div>
    );
  }
})
