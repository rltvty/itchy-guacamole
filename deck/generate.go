package deck

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"time"
)

var (
	cards map[string]Card
	rnd   = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func init() {
	file, e := ioutil.ReadFile("./data/cards.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	err := json.Unmarshal(file, &cards)
	if err != nil {
		fmt.Printf("JSON Decode error: %v\n", err)
		os.Exit(1)
	}
}

// NewRandomDeck returns a randomly selected deck
func NewRandomDeck() Deck {
	var (
		deckCards       = make([]Card, 0, 10)
		deckEvents      = make([]Card, 0, 0)
		deckSize        = 10
		adventureCards  = 0
		darkAgesCards   = 0
		prosperityCards = 0
		potions         = false
		ruins           = false
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
			if len(deckEvents) < 2 {
				deckEvents = append(deckEvents, card)
			}
		} else {
			deckCards = append(deckCards, card)
		}

		if len(deckCards) == deckSize {
			break
		}
	}

	return Deck{
		Cards:                deckCards,
		Events:               deckEvents,
		ColoniesAndPlatinums: rnd.Intn(deckSize) < prosperityCards,
		Shelters:             rnd.Intn(deckSize) < darkAgesCards,
		Potions:              potions,
		Ruins:                ruins,
	}
}
