'use strict'
var CheckboxGroup = require('./CheckboxGroup');

module.exports = React.createClass({
  displayName: 'Form',

  componentDidMount: function() {
    $.get('/sets', function(data) {
      data = JSON.parse(data);
      this.setState({ availableSets: data });
    }.bind(this)).fail(function(err) {
      console.error(err);
    });
  },

  getInitialState: function() {
    return {selectedSets: [], availableSets: []};
  },

  handleChange: function() {
    var selectedSets = this.refs.setsGroup.getCheckedValues();
    this.setState({selectedSets: selectedSets});
  },

  getSets: function() {
    return this.state.availableSets.map(function(set, index) {
      return (
        <label>
          <input type="checkbox" value={set}/>{set.split('_').join(' ')}
        </label>
      );
    });
  },

  render: function() {
    var sets = this.getSets();

    return(
      <div id='form'>
        <CheckboxGroup name="sets" value={this.state.selectedSets} ref="setsGroup" onChange={this.handleChange}>
        <div id='labels'>
          {sets}
        </div>
      </CheckboxGroup>
      </div>
    );
  }
})
