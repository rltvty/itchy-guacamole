package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
	"github.com/julienschmidt/httprouter"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

type deckResponse struct {
	Cards                []deck.Card `json:"cards"`
	ColoniesAndPlatinums bool        `json:"colonies_and_platinums"`
	Shelters             bool        `json:"shelters"`
	Potions              bool        `json:"potions"`
	Spoils               bool        `json:"spoils"`
	Ruins                bool        `json:"ruins"`
	Events               []deck.Card `json:"events"`
}

func makeDeck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	enc := json.NewEncoder(w)
	_ = enc.Encode(deck.NewRandomDeck())

	w.Header().Set("Content-Type", "application/json")
}