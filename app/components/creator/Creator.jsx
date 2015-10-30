'use strict'
var Form = require('./Form');
var Deck = require('./Deck');
var Loading = require('../Loading');
var Error = require('../Error');
var History = require('history');

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    var id = this.getQueryParam("id");
    if(id) {
      this.getDeckByID(id);
    } else {
      this.getNewDeck();
    }
  },

  getInitialState: function() {
    return {
      deck: { cards: [] },
      loading: false,
      error: false
     };
  },

  getParams: function() {
    return { sets: this.refs.form.state.selectedSets };
  },

  getQueryParam: function(field) {
    var href = window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  },

  setLoading: function() {
    this.setState({error: false, loading: true});
  },

  handleError: function(err) {
    console.error(err);
    this.setState({error: true, loading: false});
  },

  getDeckByID: function(id) {
    this.setLoading();
    $.getJSON('/deck/' + id).success(function(data) {
      this.setState({deck: data, loading: false});
      document.title = "Dom Bot | " + this.state.deck.id;
    }.bind(this))
    .error(function(err) {
      this.handleError(err);
    }.bind(this));
  },

  getNewDeck: function() {
    this.setLoading();
    var params = JSON.stringify(this.getParams());
    $.post('/deck', params).success(function(data) {
      data = JSON.parse(data);
      this.setState({deck: data, loading: false});
    }.bind(this))
    .error(function(err) {
      this.handleError(err);
    }.bind(this));

    this.updateHistory();
  },

  updateHistory: function() {
    var windowHistory = History.createHistory()
    if(this.state.deck.id) {
      windowHistory.pushState(this.state, '?id=' + this.state.deck.id);
      document.title = "Dom Bot | " + this.state.deck.id;
    }
  },

  render: function() {
    return(
      <div>
        <Form ref="form"/>
        { this.state.loading ? <Loading /> :<Deck deck={this.state.deck} />}
        { this.state.error ? <Error /> : null }
      </div>
    );
  }
})
