'use strict'
var Form = require('./Form');
var Deck = require('./Deck');
var Loading = require('../Loading');
var Error = require('../Error');
var History = require('history');
var Modal = require('react-modal');

var modalStyle = {
  overlay : {
    backgroundColor: 'rgba(175, 175, 175, 0.75)'
  },
  content: {
    border: 'none',
    background: 'none',
    borderRadius: '4px',
    padding: 'none'
  }
};

module.exports = React.createClass({
  displayName: 'Creator',

  componentDidMount: function() {
    $.getJSON('/sets', function(data) {
      var deckProperties = this.state.deckProperties;
      deckProperties.selectedSets = data;
      this.setState({availableSets: data, deckProperties: deckProperties}, this.getFirstDeck);
    }.bind(this)).fail(function(err) {
      this.handleError(err)
    }.bind(this));
  },

  getInitialState: function() {
    return {
      loading: false,
      error: false,
      settingsOpen: false,
      availableSets: [],
      deck: {
        cards: []
      },
      deckProperties: {
        selectedSets: [],
        weights: {
          trashing: 5,
          random: 5,
          chaining: 5,
          cost_spread: 5,
          set_count: 5,
          mechanic_count: 5,
        }
      }
     };
  },

  getFirstDeck: function() {
    var id = this.getQueryParam("id");
    if(id) {
      this.getDeckByID(id);
    } else {
      this.getNewDeck();
    }
  },

  showSettings: function() {
    this.setState({settingsOpen: true});
  },

  hideSettings: function() {
    this.setState({settingsOpen: false});
  },

  setDeckProperties: function(newProperties) {
    this.setState({deckProperties: newProperties});
  },

  getJSONParams: function() {
    var selectedSets = this.state.deckProperties.selectedSets;
    if(selectedSets.length == 0) {
      selectedSets = this.state.availableSets
    }
    return JSON.stringify({ sets: selectedSets, weights: this.state.deckProperties.weights });
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
    this.setState({deck: { cards: [] }, error: true, loading: false});
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
    var params = this.getJSONParams();
    $.post('/deck', params).success(function(data) {
      data = JSON.parse(data);
      this.setState({deck: data, loading: false});
      this.updateHistory();
    }.bind(this))
    .error(function(err) {
      this.handleError(err);
    }.bind(this));
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
        <Modal isOpen={this.state.settingsOpen} onRequestClose={this.hideSettings} style={modalStyle}>
          <div className="modal-content">
            <div className="modal-body">
              <Form sets={this.state.availableSets} deckProperties={this.state.deckProperties} setDeckProperties={this.setDeckProperties}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.hideSettings}>Close</button>
            </div>
          </div>
        </Modal>

        { (!this.state.loading && !this.state.error) ? <Deck deck={this.state.deck}/> : null  }
        { this.state.loading ? <Loading /> : null }
        { this.state.error ? <Error /> : null }
      </div>
    );
  }
})
