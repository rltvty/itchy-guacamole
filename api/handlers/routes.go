package handlers

import (
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

// SetRoutes sets the routes
func SetRoutes() *httprouter.Router {
	user := []byte("user")
	pass := []byte("password")

	router := httprouter.New()
	router.POST("/deck", basicAuth(makeDeck, user, pass))
	router.GET("/deck/:id", basicAuth(getDeck, user, pass))
	router.GET("/sets", basicAuth(getSets, user, pass))
	// router.POST("/slack/deck", makeSlackDeck)

	dir, _ := os.Getwd()

	router.ServeFiles("/static/*filepath", http.Dir(dir+"/web/public"))
	router.GET("/", basicAuth(indexRoute, user, pass))
	return router
}
