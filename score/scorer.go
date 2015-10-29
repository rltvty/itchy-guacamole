package score

import (
	"math/rand"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

// Weights are used to tweak the influence of different scoring techniques
type Weights struct {
	Random   uint
	Chaining uint
}

// Evaluate returns a value describing how awesome a game would be using a deck
func Evaluate(c Weights, d deck.Deck) (score uint) {
	score += (1 + c.Random) * evaluateRandom(d)
	score += (1 + c.Chaining) * evaluateChaining(d)

	return score
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
