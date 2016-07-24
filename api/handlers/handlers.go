package handlers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
	"github.com/dom-bot/itchy-guacamole/score"
	"github.com/dom-bot/itchy-guacamole/veto"
	"github.com/julienschmidt/httprouter"
)

var (
	rnd           = rand.New(rand.NewSource(time.Now().UnixNano()))
	availableSets deck.Sets
)

type makeDeckRequest struct {
	Sets            []deck.Set        `json:"sets"`
	MaxSetCount     uint              `json:"max_set_count"`
	Weights         score.Weights     `json:"weights"`
	VetoProbability *veto.Probability `json:"veto_probability,omitempty"`
}

type deckHardware struct {
	CoinTokens         bool `json:"coin_tokens"`
	VictoryTokens      bool `json:"victory_tokens"`
	MinusOneCardTokens bool `json:"minus_one_card_tokens"`
	MinusOneCoinTokens bool `json:"minus_one_coin_tokens"`
	JourneyTokens      bool `json:"journey_tokens"`
	TavernMats         bool `json:"tavern_mats"`
	TradeRouteMats     bool `json:"trade_route_mats"`
	NativeVillageMats  bool `json:"native_village_mats"`
}

type deckResponse struct {
	ID                   string       `json:"id"`
	Cards                []deck.Card  `json:"cards"`
	Events               []deck.Card  `json:"events"`
	ColoniesAndPlatinums bool         `json:"colonies_and_platinums"`
	Shelters             bool         `json:"shelters"`
	Potions              bool         `json:"potions"`
	Spoils               bool         `json:"spoils"`
	Ruins                bool         `json:"ruins"`
	Hardware             deckHardware `json:"hardware"`
}

func init() {
	setString := os.Getenv("SETS")
	if setString == "" {
		availableSets.Add(deck.Dominion)
	} else {
		exps := strings.Split(setString, `,`)

		for _, exp := range exps {
			availableSets.Add(deck.Set(exp))
		}
	}

	fmt.Printf("Using Sets: %+v\n", availableSets)
}

func getSets(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	sets := make([]string, 0, 10)

	setString := os.Getenv("SETS")
	if setString == "" {
		sets = append(sets, string(deck.Dominion))

	} else {
		sets = strings.Split(setString, `,`)
	}

	enc := json.NewEncoder(w)
	_ = enc.Encode(sets)

	w.Header().Set("Content-Type", "application/json")
}

func getDeck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	idBase64 := ps.ByName("id")
	if idBase64 == "" {
		http.Error(w, "missing 'id'", http.StatusBadRequest)
		return
	}

	id, err := base64.URLEncoding.DecodeString(idBase64)
	if idBase64 == "" {
		http.Error(w, fmt.Sprintf("unable to decode ID: %s", err), http.StatusBadRequest)
		return
	}

	d, err := deck.NewDeckFromID(id)
	if idBase64 == "" {
		http.Error(w, fmt.Sprintf("unable to deserialize ID: %s", err), http.StatusBadRequest)
		return
	}

	resp := deckResponse{
		ID:                   base64.URLEncoding.EncodeToString(d.ID()),
		Cards:                d.Cards,
		Events:               d.Events,
		ColoniesAndPlatinums: d.ColoniesAndPlatinums,
		Shelters:             d.Shelters,
		Potions:              d.Potions(),
		Spoils:               d.Spoils(),
		Ruins:                d.Ruins(),
		Hardware: deckHardware{
			CoinTokens:         d.CoinTokens(),
			VictoryTokens:      d.VictoryTokens(),
			MinusOneCardTokens: d.MinusOneCardTokens(),
			MinusOneCoinTokens: d.MinusOneCoinTokens(),
			JourneyTokens:      d.JourneyTokens(),
			TavernMats:         d.TavernMats(),
			TradeRouteMats:     d.TradeRouteMats(),
			NativeVillageMats:  d.NativeVillageMats(),
		},
	}
	enc := json.NewEncoder(w)
	_ = enc.Encode(resp)

	w.Header().Set("Content-Type", "application/json")
}

func makeDeck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var (
		sets            = availableSets
		requestedSets   deck.Sets
		vetoProbability veto.Probability
		weights         score.Weights
		req             makeDeckRequest
		maxSetCount     uint
		maxScore        uint
		d               deck.Deck
	)

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding JSON body: %s", err), http.StatusBadRequest)
		return
	}
	log.Printf("makeDeck(%+v)\n", req)

	for _, set := range req.Sets {
		requestedSets.Add(set)
	}
	if !requestedSets.Empty() {
		sets.Intersect(requestedSets)
	}
	if sets.Empty() {
		http.Error(w, "Can't generate a deck from no sets", http.StatusBadRequest)
		return
	}

	maxSetCount = req.MaxSetCount
	if maxSetCount == 0 {
		maxSetCount = 2
	}

	if req.VetoProbability == nil || (req.VetoProbability == &veto.Probability{}) {
		log.Println("Using default veto probs")
		// Defaults
		vetoProbability = veto.Probability{
			WhenTooExpensive:     0.90,
			WhenNoTrashing:       0.70,
			WhenTooManyMechanics: 0.85,
			WhenTooManyAttacks:   0.85,
		}
	} else {
		vetoProbability = *req.VetoProbability
	}

	weights = req.Weights
	// Defaults
	if weights.Trashing == 0 {
		weights.Trashing = 5
	}
	if weights.Random == 0 {
		weights.Random = 5
	}
	if weights.Chaining == 0 {
		weights.Chaining = 5
	}
	if weights.CostSpread == 0 {
		weights.CostSpread = 5
	}
	if weights.SetCount == 0 {
		weights.SetCount = 5
	}
	if weights.MechanicCount == 0 {
		weights.MechanicCount = 5
	}
	if weights.Novelty == 0 {
		weights.Novelty = 5
	}

	decks := make([]deck.Deck, 0, 1000)
	count := 0
GenerateDeck:
	candidateDeck := deck.NewRandomDeck(maxSetCount, sets)
	if veto.TooExpensive(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.NoTrashing(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.TooManyMechanics(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.TooManyAttacks(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	count++

	decks = append(decks, candidateDeck)
	if len(decks) < cap(decks) {
		goto GenerateDeck
	}

	var totalCards uint
	cardCounts := make(map[deck.Card]uint, len(deck.Cards))
	for _, deck := range decks {
		for _, card := range deck.Cards {
			cardCounts[card]++
			totalCards++
		}
		for _, card := range deck.Events {
			cardCounts[card]++
			totalCards++
		}
	}
	cardProbs := make(map[deck.Card]float64, len(cardCounts))
	for card, count := range cardCounts {
		cardProbs[card] = float64(count) / float64(totalCards)
	}

	for _, candidateDeck := range decks {
		candidateScore := score.Evaluate(weights, candidateDeck, cardProbs)
		if candidateScore > maxScore {
			d = candidateDeck
			maxScore = candidateScore
		}
	}

	resp := deckResponse{
		ID:                   base64.URLEncoding.EncodeToString(d.ID()),
		Cards:                d.Cards,
		Events:               d.Events,
		ColoniesAndPlatinums: d.ColoniesAndPlatinums,
		Shelters:             d.Shelters,
		Potions:              d.Potions(),
		Spoils:               d.Spoils(),
		Ruins:                d.Ruins(),
		Hardware: deckHardware{
			CoinTokens:         d.CoinTokens(),
			VictoryTokens:      d.VictoryTokens(),
			MinusOneCardTokens: d.MinusOneCardTokens(),
			MinusOneCoinTokens: d.MinusOneCoinTokens(),
			JourneyTokens:      d.JourneyTokens(),
			TavernMats:         d.TavernMats(),
			TradeRouteMats:     d.TradeRouteMats(),
			NativeVillageMats:  d.NativeVillageMats(),
		},
	}
	enc := json.NewEncoder(w)
	_ = enc.Encode(resp)

	w.Header().Set("Content-Type", "application/json")
}

func indexRoute(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	contents, err := ioutil.ReadFile("web/public/index.html")
	if err != nil {
		log.Println(err)
	}

	fmt.Fprint(w, string(contents))
}
