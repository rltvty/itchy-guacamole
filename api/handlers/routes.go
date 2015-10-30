package handlers

import (
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

func SetRoutes() *httprouter.Router {
	user := []byte("user")
	pass := []byte("password")

	router := httprouter.New()
	router.POST("/deck", basicAuth(makeDeck, user, pass))

	dir, _ := os.Getwd()

	router.ServeFiles("/static/*filepath", http.Dir(dir+"/app/public"))
	router.GET("/", basicAuth(indexRoute, user, pass))
	return router
}
