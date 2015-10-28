'use strict'
var React = require('react')

module.exports = React.createClass({
  displayName: 'Card',
  render: function() {
    return(
      <div>
        <p>{this.props.children.name}</p>
      </div>
    );
  }
})
