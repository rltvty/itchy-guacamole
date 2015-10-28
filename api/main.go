package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/guregu/kami"
	"golang.org/x/net/context"

	"github.com/dom-bot/itchy-guacamole/api/card"
	"github.com/dom-bot/itchy-guacamole/api/handlers"
)

func main() {
	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var cards map[string]card.Card
	err := json.Unmarshal(file, &cards)
	if err != nil {
		fmt.Printf("JSON Decode error: %v\n", err)
		os.Exit(1)
	}

	ctx := context.Background()
	ctx = context.WithValue(ctx, card.Key, cards)

	kami.Context = ctx
	handlers.SetRoutes()
	kami.Serve()
}
