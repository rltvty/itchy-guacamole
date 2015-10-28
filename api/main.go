package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/guregu/kami"
	"golang.org/x/net/context"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

const (
	cardsKey = iota
)

// Card describes a dominion card
type Card struct {
	CostPotions   int    `json:"cost_potions"`
	CostTreasure  int    `json:"cost_treasure"`
	Description   string `json:"description"`
	Expansion     string `json:"expansion"`
	ID            int    `json:"id"`
	IsAttack      bool   `json:"is_attack"`
	IsReaction    bool   `json:"is_reaction"`
	Name          string `json:"name"`
	PlusActions   int    `json:"plus_actions"`
	PlusBuys      int    `json:"plus_buys"`
	PlusCards     int    `json:"plus_cards"`
	PlusTreasure  int    `json:"plus_treasure"`
	Trashes       int    `json:"trashes"`
	Treasure      int    `json:"treasure"`
	VictoryPoints int    `json:"victory_points"`
}

type deckResponse struct {
	Cards                []Card `json:"cards"`
	ColoniesAndPlatinums bool   `json:"colonies_and_platinums"`
	Shelters             bool   `json:"shelters"`
	Potions              bool   `json:"potions"`
	Spoils               bool   `json:"spoils"`
	Ruins                bool   `json:"ruins"`
	Events               []Card `json:"events"`
}

func makeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	cards, _ := ctx.Value(cardsKey).(map[string]Card)

	var (
		deck            = make([]Card, 0, 10)
		deckSize        = 10
		adventureCards  = 0
		darkAgesCards   = 0
		prosperityCards = 0
		potions         = false
		ruins           = false
		events          = make([]Card, 0, 0)
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

		deck = append(deck, card)

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

func main() {
	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var cards map[string]Card
	err := json.Unmarshal(file, &cards)
	if err != nil {
		fmt.Printf("JSON Decode error: %v\n", err)
		os.Exit(1)
	}

	ctx := context.Background()
	ctx = context.WithValue(ctx, cardsKey, cards)

	kami.Context = ctx
	kami.Post("/deck", makeDeck)
	kami.Serve()
}
