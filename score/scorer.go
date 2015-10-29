package score

import (
	"math"
	"math/rand"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

// Weights are used to tweak the influence of different scoring techniques
type Weights struct {
	Trashing   uint `json:"trashing"`
	Random     uint `json:"random"`
	Chaining   uint `json:"chaining"`
	CostSpread uint `json:"random"`
	SetCount   uint `json:"set_count"`
}

// Evaluate returns a value describing how awesome a game would be using a deck
func Evaluate(c Weights, d deck.Deck) (score uint) {
	score += (1 + c.Trashing) * evaluateTrashing(d)
	score += (1 + c.Random) * evaluateRandom(d)
	score += (1 + c.Chaining) * evaluateChaining(d)
	score += (1 + c.CostSpread) * evaluateCostSpread(d)
	score += (1 + c.SetCount) * evaluateSetCount(d)

	return score
}

func evaluateSetCount(d deck.Deck) uint {
	sets := make(map[string]bool)
	for _, card := range d.Cards {
		sets[card.Expansion] = true
	}

	// Totally arbitrary!
	switch len(sets) {
	case 1:
		return 70
	case 2:
		return 100
	case 3:
		return 50
	default:
		return 0
	}
}

func evaluateTrashing(d deck.Deck) uint {
	trashingCards := 0
	for _, card := range d.Cards {
		if card.Trashes > 0 {
			trashingCards++
		}
	}

	// Totally arbitrary!
	switch trashingCards {
	case 0:
		return 0
	case 1:
		return 50
	case 2:
		return 100
	case 3:
		return 50
	case 4:
		return 20
	case 5:
		return 10
	default:
		return 0
	}
}

func evaluateChaining(d deck.Deck) uint {
	chainableCards := 0

	for _, card := range d.Cards {
		if card.PlusActions > 0 && card.PlusCards > 0 {
			chainableCards++
		}
	}

	return uint(100 * (float64(chainableCards) / float64(len(d.Cards))))
}

func evaluateRandom(d deck.Deck) uint {
	return uint(rnd.Uint32()) % 100
}

// Determine how well distributed the card costs are based on the entropy of the
// cost distribution
func evaluateCostSpread(d deck.Deck) uint {
	//  First, count up the total number of cards in the deck with each cost
	var distribution = map[int]uint{
		// coppers, curses
		0: 2,
		// estates
		2: 1,
		// silver
		3: 1,
		// duchys
		5: 1,
		// gold
		6: 1,
		// prov
		8: 1,
	}

	if d.ColoniesAndPlatinums {
		// platinum
		distribution[9]++
		// colonies
		distribution[11]++
	}

	if d.Potions {
		distribution[4]++
	}

	for _, card := range d.Cards {
		distribution[card.CostTreasure]++
	}

	for _, card := range d.Events {
		distribution[card.CostTreasure]++
	}

	// Now, convert those counts into "probabilities" that a randomly selected
	// card will have a given cost.  For instance, if there are 10 cards in the
	// deck and exactly 2 of them cost 3 coins, there's a 20% chance of a random
	// card costing 3 coins
	//
	// With this distribution (the probability of each different coin value),
	// calculate the entropy, which describes how "random" the distribution is
	// Decks with high entropy have a broad spread of values, decks with low
	// entropy have a small spread of values.
	cards := uint(0)
	for _, n := range distribution {
		cards += n
	}
	entropy := 0.0
	maxEntropy := 0.0
	for _, n := range distribution {
		probability := float64(n) / float64(cards)
		entropy -= probability * math.Log(probability)
		maxEntropy -= 1 / float64(cards) * math.Log(1/float64(cards))
	}

	// Scale to the range 0-100 based on the fact that the entropy for this set
	// has an upper bound where each value has the same probability
	return uint(100 * (entropy / maxEntropy))
}
