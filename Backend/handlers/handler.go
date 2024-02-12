package handlers

import (
	"backend/db"
	"backend/models"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
)

var conn *sql.DB

func init() {

	conn = db.CreateConnection()
	// defer conn.Close()
}

func CreateNewTransaction(w http.ResponseWriter, r *http.Request) {
	var input models.TransactionInput

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		fmt.Println("Error is", err.Error())
		http.Error(w, "Unable to decode the request body", http.StatusBadRequest)
		return
	}

	// Validate the input from input
	transaction, err := input.Validation()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// create UUID for new Transaction
	transaction.TransactionID = uuid.New().String()

	// Prepare the SQL statement for inserting a new transaction
	stmt, err := conn.Prepare("INSERT INTO transactions (transaction_id, created_at, amount, status, account, payment_method) VALUES ($1, $2, $3, $4, $5, $6) RETURNING transaction_id, created_at, amount, status, account, payment_method")
	if err != nil {
		http.Error(w, "Unable to prepare SQL statement", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()
	fmt.Println(stmt)
	// Execute the SQL statement to insert the new transaction and return the inserted row
	err = stmt.QueryRow(transaction.TransactionID, time.Now(), transaction.Amount, transaction.Status, transaction.Account, transaction.PaymentMethod).Scan(&transaction.TransactionID, &transaction.CreatedAt, &transaction.Amount, &transaction.Status, &transaction.Account, &transaction.PaymentMethod)
	if err != nil {
		http.Error(w, "Failed to insert transaction into the database", http.StatusInternalServerError)
		return
	}

	// Encode the fetched transaction into JSON format and return it as a response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transaction)

}

func GetAllTransactions(w http.ResponseWriter, r *http.Request) {
	//Parse query parameters for pagination
	pageStr := r.URL.Query().Get("page")
	pageSizeStr := r.URL.Query().Get("pageSize")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1 // Default page number
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil || pageSize <= 0 {
		pageSize = 25 // Default page size
	}

	// Calculate OFFSET based on page number and page size
	offset := (page - 1) * pageSize

	// Prepare the SQL query with pagination
	statement := fmt.Sprintf("SELECT * FROM transactions ORDER BY created_at DESC LIMIT %d OFFSET %d", pageSize, offset)

	// Execute the SQL query
	rows, err := conn.Query(statement)
	if err != nil {
		http.Error(w, "Failed to fetch transactions", http.StatusInternalServerError)
		log.Fatal(err.Error())
		return
	}
	defer rows.Close()

	// Iterate over the result set and scan each row into Transaction struct
	var transactions []models.Transaction
	for rows.Next() {
		var transaction models.Transaction
		err := rows.Scan(&transaction.TransactionID, &transaction.CreatedAt, &transaction.Amount, &transaction.Status, &transaction.Account, &transaction.PaymentMethod)
		if err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			log.Fatal(err.Error())
			return
		}
		transactions = append(transactions, transaction)
	}

	// Check for errors during row iteration
	if err := rows.Err(); err != nil {
		http.Error(w, "Error while iterating rows", http.StatusInternalServerError)
		log.Fatal(err.Error())
		return
	}

	// Encode the fetched transactions into JSON format and return as response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}
