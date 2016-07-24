import fetch from 'isomorphic-fetch'

// s00per s33cret
const headers = {
  'Authorization': 'Basic ' + btoa('user:password'),
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const fetchDeck = (deckProperties, successHandler) => {
  let options = {
    method: 'POST',
    body: JSON.stringify(deckProperties),
    headers: headers
  }

  fetch('deck', options)
    .then(res => res.json())
    .then(successHandler)
}

const fetchDeckByID = (id, successHandler) => {
  let options = {
    method: 'GET',
    headers: headers
  }

  fetch(`deck/${id}`, options)
    .then(res => res.json())
    .then(successHandler)
}

export { fetchDeck, fetchDeckByID }
