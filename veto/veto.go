package veto

import (
	"math/rand"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

// Probability describes the probability of vetoing a deck when a condition holds
type Probability struct {
	WhenTooExpensive     float64 `json:"when_to_expensive"`
	WhenNoTrashing       float64 `json:"when_no_trashing"`
	WhenNoChaining       float64 `json:"when_no_chaining"`
	WhenTooManySets      float64 `json:"when_too_many_sets"`
	WhenTooManyMechanics float64 `json:"when_too_many_mechanics"`
}

// TooExpensive vetos decks with no low-cost cards
func TooExpensive(p Probability, d deck.Deck) bool {
	distribution := make(map[int]uint, 8)

	for _, card := range d.Cards {
		distribution[card.CostTreasure]++
	}

	return (distribution[2]+distribution[3] < 2) && rnd.Float64() < p.WhenTooExpensive
}

// NoTrashing vetos decks with no trashing cards
func NoTrashing(p Probability, d deck.Deck) bool {
	for _, card := range d.Cards {
		if card.Trashes > 0 {
			return false
		}
	}

	return rnd.Float64() < p.WhenNoTrashing
}

// NoChaining vetos decks with no +Card/+Action cards
func NoChaining(p Probability, d deck.Deck) bool {
	for _, card := range d.Cards {
		if card.PlusActions > 0 && card.PlusCards > 0 {
			return false
		}
	}

	return rnd.Float64() < p.WhenNoTrashing
}

// TooManySets vetos decks with cards drawn from more than 2 sets
func TooManySets(p Probability, d deck.Deck) bool {
	sets := make(map[deck.Set]bool, 15)

	for _, card := range d.Cards {
		sets[card.Set] = true
	}

	return (len(sets) > 2) && rnd.Float64() < p.WhenTooManySets
}

// TooManyMechanics vetos decks using more than 2 mechanics
func TooManyMechanics(p Probability, d deck.Deck) bool {
	count := 0

	if d.Potions() {
		count++
	}
	if d.CoinTokens() {
		count++
	}
	if d.VictoryTokens() {
		count++
	}
	if d.TavernMats() {
		count++
	}
	if d.TradeRouteMats() {
		count++
	}
	if d.NativeVillageMats() {
		count++
	}
	if d.Spoils() {
		count++
	}
	if d.Ruins() {
		count++
	}
	if d.MinusOneCardTokens() {
		count++
	}
	if d.MinusOneCoinTokens() {
		count++
	}
	if d.JourneyTokens() {
		count++
	}

	return (count > 2) && rnd.Float64() < p.WhenTooManyMechanics
}
