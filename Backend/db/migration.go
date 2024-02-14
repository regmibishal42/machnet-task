package db

import "database/sql"

func MigrateTables(db *sql.DB) error {
	statements := []string{
		`CREATE TABLE transactions (
			transaction_id VARCHAR(255) PRIMARY KEY,
			created_at TIMESTAMPTZ,
			amount NUMERIC,
			status VARCHAR(255),
			from_account VARCHAR(255),
			to_account VARCHAR(255),
			payment_method VARCHAR(255),
			bank_description TEXT
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
