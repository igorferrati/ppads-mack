package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/igorferrati/ppads-mack/database"
	"github.com/igorferrati/ppads-mack/routes"
)

func main() {
	database.ConectaDB()
	routes.HandleRequests()
	verificaFaltasSistema()
}

func verificaFaltasSistema() {
	intervalo := 5 * time.Minute

	for {
		<-time.Tick(intervalo)

		//get no endpoint
		resp, err := http.Get("https://localhost:8080/alunos/enviaemail")
		if err != nil {
			fmt.Println("Erro ao enviar solicitação GET:", err)
			continue
		}

		resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			fmt.Println("O servidor retornou um código de status não esperado:", resp.StatusCode)
			continue
		}
	}
}
