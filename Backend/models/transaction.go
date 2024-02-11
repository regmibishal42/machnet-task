package models

import "time"

type TransactionStatus string

const (
	Pending  TransactionStatus = "Pending"
	Complete TransactionStatus = "Complete"
)

type Transaction struct {
	TransactionID string            `json:"transactionID"`
	CreatedAt     *time.Time        `json:"CreatedAt"`
	Amount        float64           `json:"amount"`
	Status        TransactionStatus `json:"status"`
	Account       string            `json:"account"`
	PaymentMethod string            `json:"paymentMethod"`
}
