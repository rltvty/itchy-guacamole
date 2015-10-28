package main

import (
	"log"
	"net/http"

	"github.com/dom-bot/itchy-guacamole/api/handlers"
)

func main() {
	router := handlers.SetRoutes()
	log.Fatal(http.ListenAndServe(":8000", router))
}
