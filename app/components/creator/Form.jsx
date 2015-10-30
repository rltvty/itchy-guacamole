'use strict'
var CheckboxGroup = require('./CheckboxGroup');

module.exports = React.createClass({
  displayName: 'Form',

  getInitialState: function() {
    return {selectedSets: ['dominion']};
  },

  handleChange: function() {
    var selectedSets = this.refs.setsGroup.getCheckedValues();
    this.setState({selectedSets: selectedSets});
  },

  render: function() {
    return(
      <div id='form'>
        <CheckboxGroup name="sets" value={this.state.selectedSets} ref="setsGroup" onChange={this.handleChange}>
        <div id='labels'>
          <label>
            <input type="checkbox" value="dominion"/>dominion
          </label>
          <label>
            <input type="checkbox" value="intrigue"/>intrigue
          </label>
          <label>
            <input type="checkbox" value="seaside"/>seaside
          </label>
          <label>
            <input type="checkbox" value="alchemy"/>alchemy
          </label>
          <label>
            <input type="checkbox" value="prosperity"/>prosperity
          </label>
          <label>
            <input type="checkbox" value="cornucopia"/>cornucopia
          </label>
          <label>
            <input type="checkbox" value="hinterlands"/>hinterlands
          </label>
          <label>
            <input type="checkbox" value="dark_ages"/>dark ages
          </label>
          <label>
            <input type="checkbox" value="guilds"/>guilds
          </label>
          <label>
            <input type="checkbox" value="adventures"/>adventures
          </label>
          <label>
            <input type="checkbox" value="governor"/>governor
          </label>
          <label>
            <input type="checkbox" value="prince"/>prince
          </label>
          <label>
            <input type="checkbox" value="summon"/>summon
          </label>
        </div>
      </CheckboxGroup>
      </div>
    );
  }
})
