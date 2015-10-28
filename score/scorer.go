package score

import "github.com/dom-bot/itchy-guacamole/deck"

// Config is used to control the influence how we choose between different priorites
type Config struct {
	// Prefer decks that play quickly
	PreferSpeed uint
	// Prefer decks using cards from a small number of expansions
	PreferExpansionConsistency uint
}

// Evaluate returns a value describing how awesome a game would be using a deck
func Evaluate(c Config, cards []deck.Card) int {
	return 0
}
