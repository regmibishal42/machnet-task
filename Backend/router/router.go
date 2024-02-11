package router

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// router.HandleFunc("/api/transaction/{id}", handlers.GetTransactionById).Methods("GET")
	// router.HandleFunc("/api/transactions", handlers.GetAllTransactions).Methods("GET")
	router.HandleFunc("/api/transaction/new", handlers.CreateNewTransaction).Methods("POST")
	return router
}
