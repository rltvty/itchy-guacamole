package handlers

import (
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

func SetRoutes() *httprouter.Router {
	router := httprouter.New()
	router.POST("/deck", makeDeck)

	dir, _ := os.Getwd()

	router.ServeFiles("/static/*filepath", http.Dir(dir+"/app/public"))
	router.GET("/", indexRoute)
	return router
}
