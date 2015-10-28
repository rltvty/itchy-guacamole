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

func makeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	cards, _ := ctx.Value(cardsKey).([]Card)

	deck := make([]Card, 0, 10)

	for i := range rnd.Perm(len(cards))[0:10] {
		deck = append(deck, cards[i])
	}

	enc := json.NewEncoder(w)
	_ = enc.Encode(deck)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
}

func main() {
	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var cards []Card
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
