'use strict'

module.exports = React.createClass({
  displayName: 'Loading',

  render: function() {
    return (
      <div id='loading'>
        <img src='/static/images/shield.png' className='fa fa-spin'></img>
      </div>
    );
  }
})
