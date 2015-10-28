package main

import (
	"github.com/guregu/kami"

	"github.com/dom-bot/itchy-guacamole/api/handlers"
)

func main() {
	handlers.SetRoutes()
	kami.Serve()
}
