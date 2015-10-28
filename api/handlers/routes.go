package handlers

import (
	"net/http"

	"github.com/guregu/kami"
)

func SetRoutes() {
	kami.Post("/deck", MakeDeck)
	kami.Get("/", http.FileServer(http.Dir("app/public")))
}
