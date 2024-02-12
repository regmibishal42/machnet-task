package models

import (
	"errors"
	"fmt"
	"time"
)

type Transaction struct {
	TransactionID string     `json:"transactionID"`
	CreatedAt     *time.Time `json:"CreatedAt"`
	Amount        float64    `json:"amount"`
	Status        string     `json:"status"`
	Account       string     `json:"account"`
	PaymentMethod string     `json:"paymentMethod"`
}
type TransactionInput struct {
	Amount        *float64 `json:"amount"`
	Status        *string  `json:"status"`
	Account       *string  `json:"account"`
	PaymentMethod *string  `json:"paymentMethod"`
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
	if input.Account == nil {
		return nil, errors.New("account is required")
	} else {
		transaction.Account = *input.Account
	}
	if input.PaymentMethod == nil {
		return nil, errors.New("paymentMethod is required")
	} else {
		transaction.PaymentMethod = *input.PaymentMethod
	}

	return &transaction, nil
}
