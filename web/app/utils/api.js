import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

// s00per s33cret
const headers = {
  'Authorization': 'Basic ' + btoa('user:password'),
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const updateBrowser = (deck) => {
  browserHistory.push(`?id=${deck.id}`)
  document.title = `Dom Bot | ${deck.id}`
  return deck
}

// Get allowed sets
const fetchSets = (successHandler) => {
  let options = {
    method: 'GET',
    headers: headers
  }

  fetch('sets', options)
    .then(res => res.json())
    .then(successHandler)
}

// New deck from properties
const fetchDeck = (settings, successHandler) => {
  let options = {
    method: 'POST',
    body: JSON.stringify(settings),
    headers: headers
  }

  fetch('deck', options)
    .then(res => res.json())
    .then(updateBrowser)
    .then(successHandler)
}

// Existing deck by ID
const fetchDeckByID = (id, successHandler) => {
  let options = {
    method: 'GET',
    headers: headers
  }

  fetch(`deck/${id}`, options)
    .then(res => res.json())
    .then(updateBrowser)
    .then(successHandler)
}

export { fetchSets, fetchDeck, fetchDeckByID }
