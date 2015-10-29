'use strict'
var React = require('react')

module.exports = React.createClass({
  displayName: 'Card',
  render: function() {
    var name = this.props.children.name.split(" ").join("_");
    var cardImg = "/static/images/dominion-cards/" + name + ".jpg";
    return(
      <div className='card'>
        <img src={cardImg}></img>
      </div>
    );
  }
})
