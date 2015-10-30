package deck

import "fmt"

// Card describes a dominion card
type Card struct {
	CostPotions       int       `json:"cost_potions"`
	CostTreasure      int       `json:"cost_treasure"`
	Description       string    `json:"description"`
	Event             bool      `json:"event"`
	Expansion         Expansion `json:"expansion"`
	ID                uint      `json:"id"`
	IsAttack          bool      `json:"is_attack"`
	IsReaction        bool      `json:"is_reaction"`
	IsDuration        bool      `json:"is_duration"`
	Name              string    `json:"name"`
	PlusActions       int       `json:"plus_actions"`
	PlusBuys          int       `json:"plus_buys"`
	PlusCards         int       `json:"plus_cards"`
	PlusTreasure      int       `json:"plus_treasure"`
	Trashes           int       `json:"trashes"`
	Treasure          int       `json:"treasure"`
	VictoryPoints     int       `json:"victory_points"`
	CoinTokens        bool      `json:"coin_tokens"`
	VictoryTokens     bool      `json:"victory_tokens"`
	TavernMat         bool      `json:"tavern_mat"`
	TradeRouteMat     bool      `json:"trade_route_mat"`
	NativeVillageMat  bool      `json:"native_village_mat"`
	Spoils            bool      `json:"spoils"`
	Ruins             bool      `json:"ruins"`
	MinusOneCardToken bool      `json:"minus_one_card_token"`
	MinusOneCoinToken bool      `json:"minus_one_coin_token"`
	JourneyToken      bool      `json:"journey_token"`
}

func (c Card) String() string {
	return fmt.Sprintf("{%d:%s}", c.ID, c.Name)
}

func cardByID(id uint) (c Card, ok bool) {
	for _, card := range cards {
		if card.ID == id {
			return card, true
		}
	}
	return c, false
}
