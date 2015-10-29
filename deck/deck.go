package deck

import "encoding/binary"

var (
	coloniesAndPlatinumsMask = byte(2 ^ 1)
	sheltersMask             = byte(2 ^ 2)
)

// Deck represents a dominion game
type Deck struct {
	Cards                []Card `json:"cards"`
	Events               []Card `json:"events"`
	ColoniesAndPlatinums bool   `json:"colonies_and_platinums"`
	Shelters             bool   `json:"shelters"`
}

// ID returns a serialized deck
func (d Deck) ID() []byte {
	id := []byte{0}

	if d.ColoniesAndPlatinums {
		id[0] |= coloniesAndPlatinumsMask
	}
	if d.Shelters {
		id[0] |= sheltersMask
	}

	for _, card := range d.Cards {
		binary.LittleEndian.PutUint16(id, uint16(card.ID))
	}
	for _, card := range d.Events {
		binary.LittleEndian.PutUint16(id, uint16(card.ID))
	}

	return id
}

// Potions returns true if the deck requires potions
func (d Deck) Potions() bool {
	for _, card := range d.Cards {
		if card.CostPotions > 0 {
			return true
		}
	}
	return false
}

// CoinTokens returns true if the deck require coin tokens
func (d Deck) CoinTokens() bool {
	for _, card := range d.Cards {
		if card.CoinTokens {
			return true
		}
	}
	return false
}

// VictoryTokens returns true if the deck require victory tokens
func (d Deck) VictoryTokens() bool {
	for _, card := range d.Cards {
		if card.VictoryTokens {
			return true
		}
	}
	return false
}

// TavernMats returns true if the deck requires tavern mats
func (d Deck) TavernMats() bool {
	for _, card := range d.Cards {
		if card.TavernMat {
			return true
		}
	}
	return false
}

// TradeRouteMats returns true if the deck requires trade route mats
func (d Deck) TradeRouteMats() bool {
	for _, card := range d.Cards {
		if card.TradeRouteMat {
			return true
		}
	}
	return false
}

// NativeVillageMats returns true if the deck requires native village mats
func (d Deck) NativeVillageMats() bool {
	for _, card := range d.Cards {
		if card.NativeVillageMat {
			return true
		}
	}
	return false
}

// Spoils returns true if the deck require spoils
func (d Deck) Spoils() bool {
	for _, card := range d.Cards {
		if card.Spoils {
			return true
		}
	}
	return false
}

// Ruins returns true if the deck require ruins
func (d Deck) Ruins() bool {
	for _, card := range d.Cards {
		if card.Ruins {
			return true
		}
	}
	return false
}

// MinusOneCardTokens returns true if the deck require -1 card tokens
func (d Deck) MinusOneCardTokens() bool {
	for _, card := range d.Cards {
		if card.MinusOneCardToken {
			return true
		}
	}
	return false
}

// MinusOneCoinTokens returns true if the deck require -1 coin tokens
func (d Deck) MinusOneCoinTokens() bool {
	for _, card := range d.Cards {
		if card.MinusOneCoinToken {
			return true
		}
	}
	return false
}

// JourneyTokens returns true if the deck requires journey tokens
func (d Deck) JourneyTokens() bool {
	for _, card := range d.Cards {
		if card.JourneyToken {
			return true
		}
	}
	return false
}
