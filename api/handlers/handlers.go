package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/dom-bot/itchy-guacamole/deck"
	"github.com/dom-bot/itchy-guacamole/score"
	"github.com/julienschmidt/httprouter"
)

var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

type deckResponse struct {
	deck.Deck
	Potions            bool `json:"potions"`
	CoinTokens         bool `json:"coin_tokens"`
	VictoryTokens      bool `json:"victory_tokens"`
	TavernMats         bool `json:"tavern_mats"`
	TradeRouteMats     bool `json:"trade_route_mats"`
	NativeVillageMats  bool `json:"native_village_mats"`
	Spoils             bool `json:"spoils"`
	Ruins              bool `json:"ruins"`
	MinusOneCardTokens bool `json:"minus_one_card_tokens"`
	MinusOneCoinTokens bool `json:"minus_one_coin_tokens"`
	JourneyTokens      bool `json:"journey_tokens"`
}

func makeDeck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	var (
		weights  score.Weights
		maxScore uint
		d        = deck.NewRandomDeck()
	)

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&weights)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding JSON body: %s", err), http.StatusBadRequest)
		return
	}

	maxScore = score.Evaluate(weights, d)

	for i := 0; i < 1000; i++ {
		candidateDeck := deck.NewRandomDeck()
		candidateScore := score.Evaluate(weights, candidateDeck)
		if candidateScore > maxScore {
			d = candidateDeck
			maxScore = candidateScore
		}
	}

	resp := deckResponse{
		Deck:               d,
		Potions:            d.Potions(),
		CoinTokens:         d.CoinTokens(),
		VictoryTokens:      d.VictoryTokens(),
		TavernMats:         d.TavernMats(),
		TradeRouteMats:     d.TradeRouteMats(),
		NativeVillageMats:  d.NativeVillageMats(),
		Spoils:             d.Spoils(),
		Ruins:              d.Ruins(),
		MinusOneCardTokens: d.MinusOneCardTokens(),
		MinusOneCoinTokens: d.MinusOneCoinTokens(),
		JourneyTokens:      d.JourneyTokens(),
	}
	enc := json.NewEncoder(w)
	_ = enc.Encode(resp)

	w.Header().Set("Content-Type", "application/json")
}

func indexRoute(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	contents, err := ioutil.ReadFile("app/public/index.html")
	if err != nil {
		log.Println(err)
	}

	fmt.Fprint(w, string(contents))
}
