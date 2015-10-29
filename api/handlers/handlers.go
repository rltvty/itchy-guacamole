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
	Cards                []deck.Card `json:"cards"`
	ColoniesAndPlatinums bool        `json:"colonies_and_platinums"`
	Shelters             bool        `json:"shelters"`
	Potions              bool        `json:"potions"`
	Spoils               bool        `json:"spoils"`
	Ruins                bool        `json:"ruins"`
	Events               []deck.Card `json:"events"`
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

	enc := json.NewEncoder(w)
	_ = enc.Encode(d)

	w.Header().Set("Content-Type", "application/json")
}

func indexRoute(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	contents, err := ioutil.ReadFile("app/public/index.html")
	if err != nil {
		log.Println(err)
	}

	fmt.Fprint(w, string(contents))
}
