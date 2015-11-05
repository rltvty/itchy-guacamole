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
	Trashing      uint `json:"trashing"`
	Random        uint `json:"random"`
	Chaining      uint `json:"chaining"`
	CostSpread    uint `json:"cost_spread"`
	SetCount      uint `json:"set_count"`
	MechanicCount uint `json:"mechanic_count"`
	Novelty       uint `json:"novelty"`
}

// Evaluate returns a value describing how awesome a game would be using a deck
func Evaluate(c Weights, d deck.Deck, p map[deck.Card]float64) (score uint) {
	score += (1 + c.Trashing) * evaluateTrashing(d)
	score += (1 + c.Random) * evaluateRandom(d)
	score += (1 + c.Chaining) * evaluateChaining(d)
	score += (1 + c.CostSpread) * evaluateCostSpread(d)
	score += (1 + c.SetCount) * evaluateSetCount(d)
	score += (1 + c.MechanicCount) * evaluateMechanicCount(d)
	score += (1 + c.Novelty) * evaluateNovelty(d, p)

	return score
}

// Calculates the average "surprisal" of all cards in the deck, scaled to the
// range 0-100.
//
// Surprisal is a measure of how "unusual" a value is, given the probabilities of
// all values - https://en.wikipedia.org/wiki/Self-information
// In this case, we're trying to select for cards which don't show up very
// frequently in the set of generated decks, presumably becasue they tend to
// cause decks to be vetoed (or tend to not prevent a veto)
func evaluateNovelty(d deck.Deck, p map[deck.Card]float64) uint {
	var (
		cumScore     float64
		count        uint
		maxSurprisal float64
		minSurprisal float64
	)

	// NOTE: It would be more accurate to take the average of the 10 highest &
	// lowest probabilities - this approach will be somewhat skewed if there are
	// less than 10 cards with the max/min probability
	for _, prob := range p {
		surprisal := -math.Log2(prob)
		if surprisal > maxSurprisal {
			maxSurprisal = surprisal
		}
		if surprisal < minSurprisal || minSurprisal == 0 {
			minSurprisal = surprisal
		}
	}

	scale := 100 / (maxSurprisal - minSurprisal)

	for _, card := range d.Cards {
		count++
		surprisal := -math.Log2(p[card])
		// Normalize values to 0-100
		cumScore += (scale * (surprisal - minSurprisal))
	}
	for _, card := range d.Events {
		count++
		surprisal := -math.Log2(p[card])
		// Normalize values to 0-100
		cumScore += (scale * (surprisal - minSurprisal))
	}

	score := uint(cumScore) / count
	return score
}

func evaluateMechanicCount(d deck.Deck) uint {
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

	switch count {
	case 0:
		return 100
	case 1:
		return 100
	case 2:
		return 50
	default:
		return 0
	}
}

func evaluateSetCount(d deck.Deck) uint {
	sets := make(map[deck.Set]bool)
	for _, card := range d.Cards {
		sets[card.Set] = true
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

	if d.Potions() {
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
