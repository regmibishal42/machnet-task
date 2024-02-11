package main

import (
	"backend/router"
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	r := router.Router()

	// get port from the env
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = ":8080"
	}
	fmt.Println("Starting server on the port ")
	log.Fatal(http.ListenAndServe(port, r))
}
