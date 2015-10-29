'use strict'
var React = require('react')

module.exports = React.createClass({
  displayName: 'History',

  componentDidMount: function() {
    document.title = "Dom Bot | History";
  },

  render: function() {
    return(
      <div>
        <p>History</p>
      </div>
    );
  }
})
