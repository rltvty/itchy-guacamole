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

func makeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	cards, _ := ctx.Value(cardsKey).([]Card)

	deck := make([]Card, 0, 10)

	for i := range rnd.Perm(len(cards))[0:10] {
		deck = append(deck, cards[i])
	}

	enc := json.NewEncoder(w)
	enc.Encode(deck)
}

func main() {
	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var cards []Card
	json.Unmarshal(file, &cards)

	ctx := context.Background()
	ctx = context.WithValue(ctx, cardsKey, cards)

	kami.Context = ctx
	kami.Post("/deck", makeDeck)
	kami.Serve()
}
