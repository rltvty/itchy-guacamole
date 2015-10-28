package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/guregu/kami"
	"golang.org/x/net/context"
)

const (
	cardsKey = iota
)

func makeDeck(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	cards, _ := ctx.Value(cardsKey).([]Card)
}

func main() {
	kami.Context = ctx

	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var cards []Card
	json.Unmarshal(file, &cards)

	ctx := context.Background()
	ctx = context.WithValue(ctx, cardsKey, cards)

	kami.Post("/deck", makeDeck)
	kami.Serve()
}
