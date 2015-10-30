package deck

import (
	"math/rand"
	"time"
)

var (
	rnd = rand.New(rand.NewSource(time.Now().UnixNano()))
)

// NewRandomDeck returns a randomly selected deck
func NewRandomDeck(expansions map[Expansion]bool) Deck {
	var (
		deckCards       = make([]Card, 0, 10)
		deckEvents      = make([]Card, 0, 0)
		deckSize        = 10
		adventureCards  = 0
		darkAgesCards   = 0
		prosperityCards = 0
	)

	for _, card := range cards {
		if !expansions[card.Expansion] {
			continue
		}
		if card.Expansion == DarkAges {
			darkAgesCards++
		}
		if card.Expansion == Prosperity {
			prosperityCards++
		}
		if card.Expansion == Adventures {
			adventureCards++
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

	d := Deck{
		Cards:                deckCards,
		Events:               deckEvents,
		ColoniesAndPlatinums: rnd.Intn(deckSize) < prosperityCards,
		Shelters:             rnd.Intn(deckSize) < darkAgesCards,
	}
	if adventureCards == 0 {
		d.Events = make([]Card, 0, 0)
	}

	return d
}
