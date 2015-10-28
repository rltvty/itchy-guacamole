package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/dom-bot/itchy-guacamole/api/card"

	"golang.org/x/net/context"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

type deckResponse struct {
	Cards                []card.Card `json:"cards"`
	ColoniesAndPlatinums bool        `json:"colonies_and_platinums"`
	Shelters             bool        `json:"shelters"`
	Potions              bool        `json:"potions"`
	Spoils               bool        `json:"spoils"`
	Ruins                bool        `json:"ruins"`
	Events               []card.Card `json:"events"`
}

func MakeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	cards, _ := ctx.Value(card.Key).(map[string]card.Card)

	var (
		deck            = make([]card.Card, 0, 10)
		deckSize        = 10
		adventureCards  = 0
		darkAgesCards   = 0
		prosperityCards = 0
		potions         = false
		ruins           = false
		events          = make([]card.Card, 0, 0)
	)

	for _, card := range cards {
		if card.Expansion == "Dark Ages" {
			darkAgesCards++
		}
		if card.Expansion == "Prosperity" {
			prosperityCards++
		}
		if card.Expansion == "Adventure" {
			adventureCards++
		}
		if card.CostPotions > 0 {
			potions = true
		}

		if card.Event {
			if len(events) < 2 {
				events = append(events, card)
			}
		} else {
			deck = append(deck, card)
		}

		if len(deck) == deckSize {
			break
		}
	}

	resp := deckResponse{
		Cards:                deck,
		ColoniesAndPlatinums: rnd.Intn(deckSize) < prosperityCards,
		Shelters:             rnd.Intn(deckSize) < darkAgesCards,
		Potions:              potions,
		Ruins:                ruins,
		Events:               events,
	}

	enc := json.NewEncoder(w)
	_ = enc.Encode(resp)

	w.Header().Set("Content-Type", "application/json")
}
