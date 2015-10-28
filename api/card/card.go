package card

// Card describes a dominion card
type Card struct {
	CostPotions   int    `json:"cost_potions"`
	CostTreasure  int    `json:"cost_treasure"`
	Description   string `json:"description"`
	Event         bool   `json:"event"`
	Expansion     string `json:"expansion"`
	ID            int    `json:"id"`
	IsAttack      bool   `json:"is_attack"`
	IsReaction    bool   `json:"is_reaction"`
	IsDuration    bool   `json:"is_duration"`
	Name          string `json:"name"`
	PlusActions   int    `json:"plus_actions"`
	PlusBuys      int    `json:"plus_buys"`
	PlusCards     int    `json:"plus_cards"`
	PlusTreasure  int    `json:"plus_treasure"`
	Trashes       int    `json:"trashes"`
	Treasure      int    `json:"treasure"`
	VictoryPoints int    `json:"victory_points"`
}

const (
	Key = iota
)
