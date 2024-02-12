package db

import "database/sql"

func MigrateTables(db *sql.DB) error {
	statements := []string{
		`CREATE TABLE IF NOT EXISTS transactions (
			transaction_id VARCHAR(255) PRIMARY KEY,
			created_at TIMESTAMP,
			amount NUMERIC,
			status VARCHAR(255),
			account VARCHAR(255),
			payment_method VARCHAR(255)
		);
		`,
	}
	for _, stmt := range statements {
		_, err := db.Exec(stmt)
		if err != nil {
			return err
		}
	}

	return nil
}
