package handlers

import (
	"net/http"
	"os"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/julienschmidt/httprouter"
)

func IndexRoute(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		contents, err := ioutil.ReadFile("app/public/index.html")
		if err != nil {
	    log.Println(err)
		}

    fmt.Fprint(w, string(contents))
}

func SetRoutes() *httprouter.Router {
	router := httprouter.New()
	router.POST("/deck", makeDeck)

	dir, _ := os.Getwd()

	router.ServeFiles("/static/*filepath", http.Dir(dir+"/app/public"))
	router.GET("/history", IndexRoute)
	router.GET("/", IndexRoute)
	return router
}
