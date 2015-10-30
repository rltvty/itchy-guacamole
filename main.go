package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dom-bot/itchy-guacamole/api/handlers"
)

func main() {
	router := handlers.SetRoutes()
	log.Fatal(http.ListenAndServe(GetPort(), router))
}

// GetPort is for Heroku deploys
func GetPort() string {
	var port = os.Getenv("PORT")
	// Set a default port if there is nothing in the environment
	if port == "" {
		port = "8000"
	}
	return ":" + port
}
