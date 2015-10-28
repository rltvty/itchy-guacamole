package deck

// Deck represents a dominion game
type Deck struct {
	Cards                []Card `json:"cards"`
	ColoniesAndPlatinums bool   `json:"colonies_and_platinums"`
	Shelters             bool   `json:"shelters"`
	Potions              bool   `json:"potions"`
	Spoils               bool   `json:"spoils"`
	Ruins                bool   `json:"ruins"`
	Events               []Card `json:"events"`
}
