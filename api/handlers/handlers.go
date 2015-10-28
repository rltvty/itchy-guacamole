package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"

	"golang.org/x/net/context"
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

func makeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	enc := json.NewEncoder(w)
	_ = enc.Encode(deck.NewRandomDeck())

	w.Header().Set("Content-Type", "application/json")
}
