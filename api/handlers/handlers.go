package handlers

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"net/http/httptest"
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
		req             makeDeckRequest
		maxScore        uint
		d               deck.Deck
	)

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding JSON body: %s", err), http.StatusBadRequest)
		return
	}

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

	if req.VetoProbability == nil || (req.VetoProbability == &veto.Probability{}) {
		fmt.Println("Using default probs")
		// Defaults
		vetoProbability = veto.Probability{
			WhenTooExpensive:     0.9,
			WhenNoTrashing:       0.9,
			WhenNoChaining:       0.3,
			WhenTooManySets:      1.0,
			WhenTooManyMechanics: 0.8,
			WhenTooManyAttacks:   0.7,
		}
	} else {
		vetoProbability = *req.VetoProbability
	}

	count := 0
	tries := 0
GenerateDeck:
	tries++
	candidateDeck := deck.NewRandomDeck(sets)
	if veto.TooExpensive(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.NoTrashing(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.NoChaining(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.TooManySets(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.TooManyMechanics(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	if veto.TooManyAttacks(vetoProbability, candidateDeck) {
		goto GenerateDeck
	}
	count++

	candidateScore := score.Evaluate(req.Weights, candidateDeck)
	if candidateScore > maxScore {
		d = candidateDeck
		maxScore = candidateScore
	}
	if count < 10 {
		goto GenerateDeck
	}
	log.Printf("Made deck after %d tries", tries)

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

func makeSlackDeck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	sets := strings.Split(r.FormValue("text"), ",")
	dS := make([]deck.Set, 0, len(sets))
	for _, val := range sets {
		dS = append(dS, deck.Set(val))
	}

	mDR := makeDeckRequest{
		Sets: dS,
	}
	js, err := json.Marshal(mDR)
	if err != nil {
		log.Println(err)
	}

	req, err := http.NewRequest("POST", "/deck", bytes.NewReader(js))
	if err != nil {
		log.Println(err)
	}
	writer := httptest.NewRecorder()

	makeDeck(writer, req, nil)

	var dR deckResponse
	err = json.Unmarshal(writer.Body.Bytes(), &dR)
	if err != nil {
		log.Println(err)
	}
	//do some formatting stuff
	postJson, err := json.Marshal(dR)
	if err != nil {
		log.Println(err)
	}

	http.Post("https://hooks.slack.com/services/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", "application/json", bytes.NewReader(postJson))
}

func indexRoute(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	contents, err := ioutil.ReadFile("app/public/index.html")
	if err != nil {
		log.Println(err)
	}

	fmt.Fprint(w, string(contents))
}
