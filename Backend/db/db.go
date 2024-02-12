package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

const (
	DEFAULT_HOST = "localhost"
)

func CreateConnection() *sql.DB {
	connectionUrl := generateConnectionString()
	db, err := sql.Open("postgres", connectionUrl)
	if err != nil {
		panic(err)
	}
	fmt.Println("Database Connection Successful")
	//defer db.Close()
	MigrateTables(db)
	return db
}

func generateConnectionString() string {
	if err := godotenv.Load(); err != nil {
		log.Printf("[WARNING] %v", ".env file not found")
		log.Printf("[WARNING] %v", err)
	}
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	db := os.Getenv("POSTGRES_DB")
	if host == "" {
		host = DEFAULT_HOST
	}
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, db, port)
}

func DbExceptionHandle(err error) {
	if err != nil {
		panic(err)
	}
}
