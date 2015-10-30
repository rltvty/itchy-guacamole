'use strict'

module.exports = React.createClass({
  displayName: 'Error',

  render: function() {
    return (
      <div id='error'>
        <h2 className="text-danger text-center">An error occured! Try again!</h2>
      </div>
    );
  }
})
