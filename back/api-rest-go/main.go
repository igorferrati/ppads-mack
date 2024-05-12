package main

import (
	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/routes"
)

func main() {
	database.ConectaDB()
	routes.HandleRequests()
}
