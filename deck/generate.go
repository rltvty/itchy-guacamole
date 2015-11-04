package deck

import (
	crand "crypto/rand"
	"encoding/binary"
	"fmt"
	"math/rand"
	"os"
)

var (
	rnd *rand.Rand
)

func init() {
	// NOTE: All this may not be necessary, but Heroku was generating strangely
	// not-random output and I wanted to make sure the problem wasn't a clock
	// issue.  Might be worth trying the simpler version:
	// var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))
	seedBytes := make([]byte, 8)
	_, err := crand.Read(seedBytes)
	if err != nil {
		fmt.Printf("Unable to read random bytes: %s", err)
		os.Exit(1)
	}
	seed := binary.LittleEndian.Uint64(seedBytes)

	rnd = rand.New(rand.NewSource(int64(seed)))
}

// NewRandomDeck returns a randomly selected deck
func NewRandomDeck(maxSets uint, sets Sets) Deck {
	var (
		deckSets        = make(map[Set]bool, maxSets)
		deckCards       = make([]Card, 0, 10)
		deckEvents      = make([]Card, 0, 0)
		deckSize        = 10
		adventureCards  = 0
		darkAgesCards   = 0
		prosperityCards = 0
	)

	for _, i := range rnd.Perm(len(cards)) {
		card := cards[i]

		if !sets.Include(card.Set) {
			continue
		}
		if _, ok := deckSets[card.Set]; !ok && len(deckSets) >= int(maxSets) {
			continue
		}

		switch card.Set {
		case Dominion, Intrigue, Seaside, Alchemy, Cornucopia, Hinterlands, Guilds:
			deckSets[card.Set] = true
		case DarkAges:
			deckSets[card.Set] = true
			darkAgesCards++
		case Prosperity:
			deckSets[card.Set] = true
			prosperityCards++
		case Adventures:
			deckSets[card.Set] = true
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
