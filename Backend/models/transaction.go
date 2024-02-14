package models

import (
	"errors"
	"fmt"
	"time"
)

type Transaction struct {
	TransactionID   string     `json:"transaction_id"`
	CreatedAt       *time.Time `json:"created_at"`
	Amount          float64    `json:"amount"`
	Status          string     `json:"status"`
	FromAccount     string     `json:"from_account"`
	ToAccount       string     `json:"to_account"`
	PaymentMethod   string     `json:"payment_method"`
	BankDescription string     `json:"bank_description"`
}
type TransactionInput struct {
	Amount          *float64 `json:"amount"`
	Status          *string  `json:"status"`
	FromAccount     *string  `json:"from_account"`
	ToAccount       *string  `json:"to_account"`
	PaymentMethod   *string  `json:"payment_method"`
	BankDescription *string  `json:"bank_description"`
}

func (input *TransactionInput) Validation() (*Transaction, error) {
	transaction := Transaction{}
	if input.Amount == nil {
		return nil, errors.New("amount is required")
	} else {
		transaction.Amount = *input.Amount
	}
	if input.Status == nil {
		fmt.Println("Status ", *input.Status)
		return nil, errors.New("status is required")
	} else {
		// check if status is pending/complete or not
		if !(*input.Status == "Complete" || *input.Status == "Pending") {
			return nil, errors.New("status can be Pending or Complete only")
		}
		transaction.Status = *input.Status
	}
	if input.FromAccount == nil {
		return nil, errors.New("from_account is required")
	} else {
		transaction.FromAccount = *input.FromAccount
	}
	if input.ToAccount == nil {
		return nil, errors.New("to_account is required")
	} else {
		transaction.ToAccount = *input.ToAccount
	}
	if input.BankDescription == nil {
		return nil, errors.New("bank_description is required")
	} else {
		transaction.BankDescription = *input.BankDescription
	}
	if input.PaymentMethod == nil {
		return nil, errors.New("paymentMethod is required")
	} else {
		transaction.PaymentMethod = *input.PaymentMethod
	}

	return &transaction, nil
}
