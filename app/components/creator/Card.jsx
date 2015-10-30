'use strict'

module.exports = React.createClass({
  displayName: 'Card',

  render: function() {
    var setName = this.props.children.set.split("_").join(" ");
    var cardImg = "/static/images/dominion-cards/" + this.props.children.name.split(" ").join("_") + ".jpg";

    return(
      <div className='card'>
        <p>{setName}</p>
        <img src={cardImg}></img>
      </div>
    );
  }
})
